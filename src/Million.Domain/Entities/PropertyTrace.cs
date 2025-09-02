using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Million.Domain.Entities;

public class PropertyTrace : BaseEntity
{
    [BsonElement("propertyId")]
    [BsonRepresentation(BsonType.ObjectId)] // Store this Guid FK as a string
    public string PropertyId { get; set; } = ObjectId.GenerateNewId().ToString();

    [BsonElement("dateSale")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime DateSale { get; set; }

    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("value")]
    [BsonRepresentation(BsonType.Decimal128)]
    public decimal Value { get; set; }

    [BsonElement("tax")]
    [BsonRepresentation(BsonType.Decimal128)]
    public decimal Tax { get; set; }
}