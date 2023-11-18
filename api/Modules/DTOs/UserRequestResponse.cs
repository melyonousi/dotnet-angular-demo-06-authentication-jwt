namespace api.Models.DTOs;
public class UserRequestResponse
{
    public required string Id { get; set; }
    public string? Name { get; set; } = string.Empty;
    public string? Email { get; set; } = string.Empty;
    public string? Phone { get; set; } = string.Empty;
}