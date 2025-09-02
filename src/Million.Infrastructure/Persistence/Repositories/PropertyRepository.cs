using Million.Application.Interfaces;
using Million.Domain.Entities;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Million.Infrastructure.Persistence.Repositories;

public class PropertyRepository : IPropertyRepository
{
    private readonly MongoDbContext _context;   

    public PropertyRepository(MongoDbContext context)
    {
        _context = context;        
    }

    public async Task<Property?> GetByIdAsync(string id)
    {
        return await _context.Properties.Find(p => p.Id.Equals(id)).FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Property>> GetFilteredAsync(string? name, string? address, decimal? minPrice, decimal? maxPrice)
    {
        var filterBuilder = Builders<Property>.Filter;
        var filter = filterBuilder.Empty;

        if (!string.IsNullOrWhiteSpace(name))
        {
            // Case-insensitive regex match for name
            filter &= filterBuilder.Regex(p => p.Name, new BsonRegularExpression(name, "i"));
        }

        if (!string.IsNullOrWhiteSpace(address))
        {
            // Case-insensitive regex match for address
            filter &= filterBuilder.Regex(p => p.Address, new BsonRegularExpression(address, "i"));
        }

        if (minPrice.HasValue)
        {
            filter &= filterBuilder.Gte(p => p.Price, minPrice.Value);
        }

        if (maxPrice.HasValue)
        {
            filter &= filterBuilder.Lte(p => p.Price, maxPrice.Value);
        }

        return await _context.Properties.Find(filter).ToListAsync();
    }

    public async Task<Property?> GetPropertyDetailByIdAsync(string id)
    {
        // This pipeline uses the fluent, strongly-typed API for all stages.
        var pipeline = _context.Properties.Aggregate()
            // Stage 1: Match the specific property.
            .Match(p => p.Id == id)

            // Stage 2: Join with the 'owners' collection.
            .Lookup<Property, Owner, PropertyWithJoins>(
                _context.Owners,
                property => property.OwnerId,
                owner => owner.Id,
                result => result.OwnerDocs
            )

            // Stage 3: Join with the 'propertyimages' collection.
            .Lookup<PropertyWithJoins, PropertyImage, PropertyWithJoins>(
                _context.PropertyImages,
                property => property.Id,
                image => image.PropertyId,
                result => result.ImagesDocs
            )

            // Stage 4: Join with the 'propertytraces' collection.
            .Lookup<PropertyWithJoins, PropertyTrace, PropertyWithJoins>(
                _context.PropertyTraces,
                property => property.Id,
                trace => trace.PropertyId,
                result => result.TracesDocs
            )

            // Stage 5: Project into the final DTO shape.
            .Project(p => new Property
            {
                Id = p.Id,
                OwnerId = p.OwnerId,
                Name = p.Name,
                Address = p.Address,
                Price = p.Price,
                CodeInternal = p.CodeInternal,
                Year = p.Year,
                // The OwnerDocs array from lookup will have 0 or 1 element. FirstOrDefault handles this.
                Owner = p.OwnerDocs.FirstOrDefault(),
                Images = p.ImagesDocs.ToList(),
                Traces = p.TracesDocs.ToList(),
                // Server-side logic to find the first enabled image URL.
                ImageUrl = p.ImagesDocs.FirstOrDefault(img => img.IsEnabled).FileUrl ?? ""
            });

        // Execute the pipeline and return the single result.
        return await pipeline.FirstOrDefaultAsync();
    }
}

file class PropertyWithJoins : Property
{
    public IEnumerable<Owner> OwnerDocs { get; set; } = new List<Owner>();
    public new IEnumerable<PropertyImage> ImagesDocs { get; set; } = new List<PropertyImage>();
    public new IEnumerable<PropertyTrace> TracesDocs { get; set; } = new List<PropertyTrace>();
}