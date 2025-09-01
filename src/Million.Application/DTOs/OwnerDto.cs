namespace Million.Application.DTOs;

public class OwnerDto
{
    public string Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string PhotoUrl { get; set; } = string.Empty;
    public DateTime Birthday { get; set; }
}