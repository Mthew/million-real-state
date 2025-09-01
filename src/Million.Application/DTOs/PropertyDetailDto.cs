namespace Million.Application.DTOs;

public class PropertyDetailDto
{
    public string Id { get; set; }
    public string OwnerId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string CodeInternal { get; set; } = string.Empty;
    public int Year { get; set; }

    // Derived property, not directly in the main document
    public string ImageUrl { get; set; } = string.Empty;

    // Populated by aggregation pipeline
    public OwnerDto Owner { get; set; } = new();
    public ICollection<PropertyImageDto> Images { get; set; } = new List<PropertyImageDto>();
    public ICollection<PropertyTraceDto> Traces { get; set; } = new List<PropertyTraceDto>();
}