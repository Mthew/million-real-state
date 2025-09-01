using Microsoft.Extensions.Options;
using Million.Domain.Entities;
using Million.Infrastructure.Settings;
using MongoDB.Driver;

namespace Million.Infrastructure.Persistence;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(IOptions<MongoDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        _database = client.GetDatabase(settings.Value.DatabaseName);
    }
    public IMongoCollection<Property> Properties => _database.GetCollection<Property>(nameof(Properties));
    public IMongoCollection<Owner> Owners => _database.GetCollection<Owner>(nameof(Owners));
    public IMongoCollection<PropertyImage> PropertyImages => _database.GetCollection<PropertyImage>(nameof(PropertyImages));
    public IMongoCollection<PropertyTrace> PropertyTraces => _database.GetCollection<PropertyTrace>(nameof(PropertyTraces));
}