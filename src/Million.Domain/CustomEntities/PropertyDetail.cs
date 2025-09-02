using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Million.Domain.Entities;

public class PropertyDetail
{
    public string Id { get; set; }
    public string OwnerId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string CodeInternal { get; set; } = string.Empty;
    public int Year { get; set; }

    #region Custome Properties
    public string? ImageUrl { get; set; } = string.Empty;
    public Owner? Owner { get; set; } = new();
    public ICollection<PropertyImage>? Images { get; set; } = new List<PropertyImage>();
    public ICollection<PropertyTrace>? Traces { get; set; } = new List<PropertyTrace>();

    #endregion
}