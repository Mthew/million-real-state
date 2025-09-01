using Million.Domain.Entities;
using MongoDB.Bson.Serialization;

namespace Million.Infrastructure.Persistence.Mappings;

public static class MongoDbMapper
{
    private static bool _isConfigured = false;

    public static void Configure()
    {
        if (_isConfigured) return;

        BsonClassMap.RegisterClassMap<Owner>();
        BsonClassMap.RegisterClassMap<Property>();
        BsonClassMap.RegisterClassMap<PropertyImage>();
        BsonClassMap.RegisterClassMap<PropertyTrace>();

        _isConfigured = true;
    }
}