using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Million.Domain.Entities;

public class PropertyImage : BaseEntity
{
    [BsonElement("propertyId")]
    [BsonRepresentation(BsonType.ObjectId)] // Store this Guid FK as a string
    public string PropertyId { get; set; } = ObjectId.GenerateNewId().ToString();

    [BsonElement("fileUrl")]
    public string FileUrl { get; set; } = string.Empty;

    [BsonElement("isEnabled")]
    public bool IsEnabled { get; set; }
}