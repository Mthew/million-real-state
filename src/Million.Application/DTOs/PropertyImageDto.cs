namespace Million.Application.DTOs;

public class PropertyImageDto
{
    public string Id { get; set; }
    public string PropertyId { get; set; }
    public string FileUrl { get; set; } = string.Empty;
    public bool IsEnabled { get; set; }
}