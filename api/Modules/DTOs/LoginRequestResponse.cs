using api.Models.DTOs;

namespace api.Models.DTOs;

public class LoginRequestResponse : AuthResult
{
    public UserRequestResponse? User { get; set; }
}