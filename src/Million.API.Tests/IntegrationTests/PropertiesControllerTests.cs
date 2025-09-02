using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Million.Application.DTOs;
using Million.Domain.Entities;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Million.Api.Tests.IntegrationTests;

[TestFixture]
public class PropertiesControllerTests
{
    private MillionApiFactory _factory = null!;
    private HttpClient _client = null!;
    private IMongoCollection<Property> _propertiesCollection = null!;
    private IMongoCollection<Owner> _ownersCollection = null!; // For detailed tests

    [OneTimeSetUp]
    public void OneTimeSetUp()
    {
        _factory = new MillionApiFactory();
        _client = _factory.CreateClient();

        var mongoClient = new MongoClient(_factory.Runner.ConnectionString);
        var database = mongoClient.GetDatabase("MillionRealEstateTest");
        _propertiesCollection = database.GetCollection<Property>("Properties");
        _ownersCollection = database.GetCollection<Owner>("Owners");
    }

    [OneTimeTearDown]
    public void OneTimeTearDown()
    {
        _client.Dispose();
        _factory.Dispose();
    }

    [SetUp]
    public async Task SetUp()
    {
        // Clear collections before each test for isolation
        await _propertiesCollection.DeleteManyAsync(FilterDefinition<Property>.Empty);
        await _ownersCollection.DeleteManyAsync(FilterDefinition<Owner>.Empty);
    }

    // You already have a GetProperties test, let's add one with filters
    [Test]
    public async Task GetProperties_WithPriceFilter_ReturnsOnlyMatchingProperties()
    {
        var ownerId = ObjectId.GenerateNewId().ToString();
        var owner = new Owner { Id = ownerId, Name = "Test Owner", Address = "Calle 22", Birthday = DateTime.Now };

        // Arrange: Seed the database with multiple properties
        await _ownersCollection.InsertOneAsync(owner);
        await _propertiesCollection.InsertManyAsync(new[]
        {
            new Property { Address = "Calle 22", Year = 2025, CodeInternal = "1", Name = "Cheap Shack", Price = 50_000, Id = ObjectId.GenerateNewId().ToString(), OwnerId = owner.Id },
            new Property { Address = "Calle 22",Year = 2025, CodeInternal = "2", Name = "Mid-Range House", Price = 250_000, Id = ObjectId.GenerateNewId().ToString(),  OwnerId = owner.Id },
            new Property { Address = "Calle 22",Year = 2025, CodeInternal = "3", Name = "Luxury Mansion", Price = 2_000_000, Id = ObjectId.GenerateNewId().ToString(), OwnerId = owner.Id }
        });

        // Act: Send a request with minPrice and maxPrice query parameters
        var response = await _client.GetAsync("/api/properties?minPrice=200000&maxPrice=300000");

        // Assert
        response.EnsureSuccessStatusCode();
        var properties = await response.Content.ReadFromJsonAsync<List<PropertyDto>>();

        properties.Should().HaveCount(1);
        properties!.First().Name.Should().Be("Mid-Range House");
    }

    [Test]
    public async Task GetPropertyById_WithExistingId_ReturnsFullDetailDto()
    {
        // Arrange: Seed related data across multiple collections
        var ownerId = ObjectId.GenerateNewId().ToString();
        var propertyId = ObjectId.GenerateNewId().ToString();

        var owner = new Owner { Id = ownerId, Name = "Test Owner", Address = "Calle 22", Birthday = DateTime.Now };
        await _ownersCollection.InsertOneAsync(owner);

        var property = new Property { Id = propertyId, Name = "Detailed Property", OwnerId = owner.Id, Price = 500000, Address = "Calle 22", Year = 2025 };

        await _propertiesCollection.InsertOneAsync(property);

        // Act
        var response = await _client.GetAsync($"/api/properties/{property.Id}");

        // Assert
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadFromJsonAsync<PropertyDetailDto>();

        result.Should().NotBeNull();
        result!.Id.Should().Be(propertyId);
        result.Name.Should().Be("Detailed Property");
        result.Owner.Should().NotBeNull();
        result.Owner.Id.Should().Be(ownerId);
        result.Owner.Name.Should().Be("Test Owner");
    }

    [Test]
    public async Task GetPropertyById_WithNonExistentId_ReturnsNotFound()
    {
        // Arrange
        var nonExistentId = ObjectId.GenerateNewId().ToString();

        // Act
        var response = await _client.GetAsync($"/api/properties/{nonExistentId}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
}