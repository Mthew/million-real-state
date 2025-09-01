using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Million.Domain.Entities;

public class Owner : BaseEntity
{
    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("address")]
    public string Address { get; set; } = string.Empty;

    [BsonElement("photoUrl")]
    public string PhotoUrl { get; set; } = string.Empty;

    [BsonElement("birthday")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)] // Good practice for dates
    public DateTime Birthday { get; set; }
}