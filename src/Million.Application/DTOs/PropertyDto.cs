using System.Runtime.Serialization;

namespace Million.Application.DTOs;

public class PropertyDto
{
    public string Id { get; set; }
    public string OwnerId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string CodeInternal { get; set; } = string.Empty;
    public int Year { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
}