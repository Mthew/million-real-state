using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Million.Domain.Entities;

public class Property : BaseEntity
{
    [BsonElement("ownerId")]
    [BsonRepresentation(BsonType.ObjectId)] // Store this Guid FK as a string
    public string OwnerId { get; set; } = string.Empty;

    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("address")]
    public string Address { get; set; } = string.Empty;

    [BsonElement("price")]
    [BsonRepresentation(BsonType.Decimal128)] // Essential for financial data
    public decimal Price { get; set; }

    [BsonElement("codeInternal")]
    public string CodeInternal { get; set; } = string.Empty;

    [BsonElement("year")]
    public int Year { get; set; }

    #region Custome Properties
    public string? ImageUrl { get; set; } = string.Empty;

    // Populated by aggregation pipeline
    public Owner? Owner { get; set; } = new();
    public ICollection<PropertyImage>? Images { get; set; } = new List<PropertyImage>();
    public ICollection<PropertyTrace>? Traces { get; set; } = new List<PropertyTrace>();

    #endregion
}