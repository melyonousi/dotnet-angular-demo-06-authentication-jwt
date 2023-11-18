using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Configurations;
using api.Models.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthManagementController : ControllerBase
{
    private readonly ILogger<AuthManagementController> _logger;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly JwtConfig _jwtConfig;
    public AuthManagementController(ILogger<AuthManagementController> logger, UserManager<IdentityUser> userManager, IOptionsMonitor<JwtConfig> optionsMonitor)
    {
        _logger = logger;
        _userManager = userManager;
        _jwtConfig = optionsMonitor.CurrentValue;
    }

    [HttpPost]
    [Route("Register")]
    public async Task<IActionResult> Register([FromBody] UserRegistrationRequestDTO requestDTO)
    {
        if (ModelState.IsValid)
        {
            // checked if email exist
            var emailExist = await _userManager.FindByEmailAsync(requestDTO.Email);
            if (emailExist != null) return BadRequest("Email already exists");

            var newUser = new IdentityUser()
            {
                NormalizedUserName = requestDTO.Name,
                Email = requestDTO.Email.Trim().ToLower(),
                UserName = requestDTO.Email.ToLower().Split('@')[0].Trim()
            };

            var isCreated = await _userManager.CreateAsync(newUser, requestDTO.Password.Trim());
            if (isCreated.Succeeded)
            {
                // generate a token
                var token = GenerateJwttoken(newUser);
                return Ok(new RegistrationRequestResponse()
                {
                    Result = true,
                    Token = token
                });
            }
            return BadRequest(isCreated.Errors.Select(x => x.Description).ToList());
        }
        return BadRequest("Invalid user registration request");
    }

    [HttpPost]
    [Route("Login")]
    public async Task<IActionResult> Login([FromBody] UserLoginRequestDTO requestDTO)
    {
        if (ModelState.IsValid)
        {
            var existingUser = await _userManager.FindByEmailAsync(requestDTO.Email);
            if (existingUser == null) return BadRequest("Invalid authentication");

            var token = GenerateJwttoken(existingUser);

            var isPasswordValid = await _userManager.CheckPasswordAsync(existingUser, requestDTO.Password);
            if (isPasswordValid)
            {
                var user = new UserRequestResponse
                {
                    Id = existingUser.Id,
                    Email = existingUser.Email,
                    Name = existingUser.NormalizedUserName,
                    Phone = existingUser.PhoneNumber
                };
                return Ok(new LoginRequestResponse()
                {
                    User = user,
                    Token = token,
                    Result = true
                });
            }
            return BadRequest("Invalid user Password request");
        }
        return BadRequest("Invalid user Email request");
    }

    [NonAction]
    private string GenerateJwttoken(IdentityUser user)
    {
        var jwtTokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_jwtConfig.Secret!);
        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(new[]{
                new Claim("Id", user.Id),
                new Claim(JwtRegisteredClaimNames.Sub, user.Email!),
                new Claim(JwtRegisteredClaimNames.Email, user.Email!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            }),
            Expires = DateTime.UtcNow.AddHours(4),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512)
        };
        var token = jwtTokenHandler.CreateToken(tokenDescriptor);
        var jwtToken = jwtTokenHandler.WriteToken(token);
        return jwtToken;
    }
}