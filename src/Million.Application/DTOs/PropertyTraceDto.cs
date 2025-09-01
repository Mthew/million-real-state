namespace Million.Application.DTOs;

public class PropertyTraceDto
{
    public string Id { get; set; }
    public string PropertyId { get; set; } 
    public DateTime DateSale { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Value { get; set; }
    public decimal Tax { get; set; }
}