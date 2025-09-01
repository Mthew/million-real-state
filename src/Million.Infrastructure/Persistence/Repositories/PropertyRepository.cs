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
                result => result.Images
            )

            // Stage 4: Join with the 'propertytraces' collection.
            .Lookup<PropertyWithJoins, PropertyTrace, PropertyWithJoins>(
                _context.PropertyTraces,
                property => property.Id,
                trace => trace.PropertyId,
                result => result.Traces
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
                Images = p.Images.ToList(),
                Traces = p.Traces.ToList(),
                // Server-side logic to find the first enabled image URL.
                ImageUrl = p.Images.FirstOrDefault(img => img.IsEnabled).FileUrl ?? ""
            });

        // Execute the pipeline and return the single result.
        return await pipeline.FirstOrDefaultAsync();
    }


    //public async Task<PropertyDetailDto?> GetPropertyDetailByIdAsync(string id)
    //{
    //    // Define collection names to avoid magic strings
    //    var ownersCollectionName = _context.Owners.CollectionNamespace.CollectionName;
    //    var imagesCollectionName = _context.PropertyImages.CollectionNamespace.CollectionName;
    //    var tracesCollectionName = _context.PropertyTraces.CollectionNamespace.CollectionName;

    //    // Replace the problematic Lookup stage with the correct usage of the MongoDB.Driver.Lookup method.
    //    // The Lookup method expects the following parameters:
    //    //   - foreignCollectionName (string)
    //    //   - localField (string)
    //    //   - foreignField (string)
    //    //   - @as (string)
    //    //
    //    // The previous code was incorrectly passing BsonDocument objects instead of strings.

    //    var pipeline = _context.Properties.Aggregate()
    //        // Stage 1: Match the specific property. This is the key performance step.
    //        .Match(p => p.Id.Equals(id))

    //        ////// Stage 2: Join with 'owners' collection.
    //        ////// Correct usage: .Lookup<Owner, PropertyDetailDto>(ownersCollectionName, "ownerId", "_id", "Owner")
    //        //.Lookup<Owner, PropertyDetailDto>(ownersCollectionName, "ownerId", "_id", "Owner")


    //        ////// Unwind the owner array, as it will contain one or zero elements.
    //        //.Unwind<PropertyDetailDto, PropertyDetailDto>(x => x.Owner, new AggregateUnwindOptions<PropertyDetailDto> { PreserveNullAndEmptyArrays = true })

    //        // Stage 3 & 4: We must use BsonDocument-based lookups for joining Guid with String.
    //        .AppendStage<BsonDocument>(new BsonDocument("$addFields", new BsonDocument("propertyIdAsString", new BsonDocument("$toString", "$_id"))))

    //        // Join with 'propertyimages'
    //        //.AppendStage<BsonDocument>(new BsonDocument("$lookup",
    //        //    new BsonDocument
    //        //    {
    //        //        { "from", imagesCollectionName },
    //        //        { "localField", "propertyIdAsString" },
    //        //        { "foreignField", "propertyId" },
    //        //        { "as", "Images" }
    //        //    }))

    //        //// Join with 'propertytraces'
    //        //.AppendStage<BsonDocument>(new BsonDocument("$lookup",
    //        //    new BsonDocument
    //        //    {
    //        //        { "from", tracesCollectionName },
    //        //        { "localField", "propertyIdAsString" },
    //        //        { "foreignField", "propertyId" },
    //        //        { "as", "Traces" }
    //        //    }))

    //        // Stage 5: Project the final shape.
    //        .Project<PropertyDetailDto>(new BsonDocument
    //        {
    //            //{ "_id", 0 }, // Exclude the BSON _id from the final DTO
    //            //{ "Id", "$_id" },
    //            { "OwnerId", "$ownerId" },
    //            { "Name", "$name" },
    //            { "Address", "$address" },
    //            { "Price", "$price" },
    //            { "CodeInternal", "$codeInternal" },
    //            { "Year", "$year" },
    //            { "Owner", "$Owner" },
    //            //{ "Images", new BsonDocument("$map", // Clean up the images DTO
    //            //    new BsonDocument
    //            //    {
    //            //        { "input", "$Images" },
    //            //        { "as", "img" },
    //            //        { "in", new BsonDocument { { "Id", "$$img._id" }, { "FileUrl", "$$img.fileUrl" }, { "IsEnabled", "$$img.isEnabled" } } }
    //            //    })
    //            //},
    //            //{ "Traces", new BsonDocument("$map", // Clean up the traces DTO
    //            //    new BsonDocument
    //            //    {
    //            //        { "input", "$Traces" },
    //            //        { "as", "trace" },
    //            //        { "in", new BsonDocument { { "Id", "$$trace._id" }, { "DateSale", "$$trace.dateSale" }, { "Name", "$$trace.name" }, { "Value", "$$trace.value" }, { "Tax", "$$trace.tax" } } }
    //            //    })
    //            //},
    //            //{
    //            //    "ImageUrl", new BsonDocument("$let", new BsonDocument
    //            //    {
    //            //        { "vars", new BsonDocument("enabledImage", new BsonDocument("$arrayElemAt", new BsonArray
    //            //            {
    //            //                new BsonDocument("$filter", new BsonDocument
    //            //                {
    //            //                    { "input", "$Images" },
    //            //                    { "as", "img" },
    //            //                    { "cond", new BsonDocument("$eq", new BsonArray { "$$img.isEnabled", true }) }
    //            //                }),
    //            //                0
    //            //            }))
    //            //        },
    //            //        { "in", "$$enabledImage.fileUrl" }
    //            //    })
    //            //}
    //        });

    //    var result = await pipeline.FirstOrDefaultAsync();

    //    if (result != null && string.IsNullOrEmpty(result.ImageUrl))
    //    {
    //        result.ImageUrl = ""; // Set a default or empty string
    //    }

    //    return result;
    //}

    //public async Task<PropertyDetailDto?> GetPropertyDetailByIdAsync(Guid id)
    //{
    //    // The aggregation pipeline is a series of stages. Each stage transforms the documents.
    //    var pipeline = _context.Properties.Aggregate()
    //        // Stage 1: Match the specific property we want. This is the crucial first step for performance.
    //        // It ensures the rest of the pipeline only operates on a single document.
    //        .Match(p => p.Id == id)

    //        // Stage 2: Perform a LEFT JOIN to the 'owners' collection.
    //        .Lookup<Property, Owner, BsonDocument>(
    //            _context.Owners,
    //            property => property.OwnerId, // Foreign field from the 'properties' collection
    //            owner => owner.Id,            // Local field from the 'owners' collection
    //            r => r["owner_docs"]          // The name of the new array field
    //        )

    //        // Stage 3: Perform a LEFT JOIN to the 'propertyimages' collection.
    //        .Lookup<BsonDocument, PropertyImage, BsonDocument>(
    //            _context.PropertyImages,
    //            property => new BsonDocument("localField", "_id"),       // Join on the property's _id
    //            image => new BsonDocument("foreignField", "propertyId"), // Match propertyId in images
    //            r => r["images"]                                   // The name of the new array field
    //        )

    //        // Stage 4: Perform a LEFT JOIN to the 'propertytraces' collection.
    //        .Lookup<BsonDocument, PropertyTrace, BsonDocument>(
    //            _context.PropertyTraces,
    //            property => new BsonDocument("localField", "_id"),       // Join on the property's _id
    //            trace => new BsonDocument("foreignField", "propertyId"), // Match propertyId in traces
    //            r => r["traces"]                                     // The name of the new array field
    //        )

    //        // Stage 5: Reshape the document into our desired DTO structure.
    //        .Project(new BsonDocument
    //        {
    //            { "Id", "$_id" },
    //            { "OwnerId", "$ownerId" },
    //            { "Name", "$name" },
    //            { "Address", "$address" },
    //            { "Price", "$price" },
    //            { "CodeInternal", "$codeInternal" },
    //            { "Year", "$year" },
    //            {
    //                // Unwind the 'owner' array (it will have 0 or 1 element) and get the first element.
    //                "Owner", new BsonDocument("$arrayElemAt", new BsonArray { "$owner_docs", 0 })
    //            },
    //            { "Images", "$images" },
    //            { "Traces", "$traces" },
    //            {
    //                // Add logic to get the first enabled image URL
    //                "ImageUrl", new BsonDocument("$let", new BsonDocument
    //                {
    //                    { "vars", new BsonDocument("enabledImage", new BsonDocument("$arrayElemAt", new BsonArray
    //                        {
    //                            new BsonDocument("$filter", new BsonDocument
    //                            {
    //                                { "input", "$images" },
    //                                { "as", "img" },
    //                                { "cond", new BsonDocument("$eq", new BsonArray { "$$img.isEnabled", true }) }
    //                            }),
    //                            0
    //                        }))
    //                    },
    //                    { "in", "$$enabledImage.fileUrl" }
    //                })
    //            }
    //        });

    //    // Execute the pipeline and get the single result.
    //    var result = await pipeline.As<PropertyDetailDto>().FirstOrDefaultAsync();

    //    // If the main image URL is null, provide a default or empty string.
    //    if (result != null && string.IsNullOrEmpty(result.ImageUrl))
    //    {
    //        result.ImageUrl = "https://example.com/no-image-available.png"; // Or string.Empty
    //    }

    //    return result;
    //}
}

file class PropertyWithJoins : Property
{
    public IEnumerable<Owner> OwnerDocs { get; set; } = new List<Owner>();
    public new IEnumerable<PropertyImage> Images { get; set; } = new List<PropertyImage>();
    public new IEnumerable<PropertyTrace> Traces { get; set; } = new List<PropertyTrace>();
}