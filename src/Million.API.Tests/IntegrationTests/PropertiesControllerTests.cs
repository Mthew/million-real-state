using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Million.Application.DTOs;
using Million.Domain.Entities;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Driver;

namespace Million.Api.Tests.IntegrationTests;

[TestFixture]
public class PropertiesControllerTests
{
    private MillionApiFactory _factory = null!;
    private HttpClient _client = null!;
    private IMongoCollection<Property> _propertiesCollection = null!;



    [OneTimeSetUp]
    public void OneTimeSetUp()
    {
        _factory = new MillionApiFactory();
        _client = _factory.CreateClient();

        // Get direct access to the in-memory database collection to seed data
        var mongoClient = new MongoClient(_factory.Runner.ConnectionString);
        var database = mongoClient.GetDatabase("MillionRealEstateTest");
        _propertiesCollection = database.GetCollection<Property>(nameof(Property).ToLower());
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
        // Clear the collection before each test to ensure isolation
        await _propertiesCollection.DeleteManyAsync(FilterDefinition<Property>.Empty);
    }

    [Test]
    public async Task GetProperties_WithNoFilters_ReturnsOkAndAllProperties()
    {
        // Arrange: Seed the in-memory database with test data.
        var testProperty = new Property
        {
            Id = ObjectId.GenerateNewId().ToString(),
            Name = "Test Villa",
            Address = "123 Test Street",
            Price = 1000000,
            Year = 2024,
            CodeInternal = "TV01",
            OwnerId = ObjectId.GenerateNewId().ToString()
        };
        await _propertiesCollection.InsertOneAsync(testProperty);

        // Act: Send a real HTTP GET request to the endpoint.
        var response = await _client.GetAsync("/api/properties");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        var properties = await response.Content.ReadFromJsonAsync<List<PropertyDto>>();
        properties.Should().NotBeNull();
        properties.Should().HaveCount(1);
        properties.Should().ContainSingle(p => p.Name == "Test Villa" && p.Id == testProperty.Id);
    }

    [Test]
    public async Task GetPropertyById_WithExistingId_ReturnsOkAndProperty()
    {
        // Arrange
        var propertyId = ObjectId.GenerateNewId().ToString();
        var testProperty = new Property { Id = propertyId, Name = "Specific Property", /* other fields */ };
        await _propertiesCollection.InsertOneAsync(testProperty);

        // Act
        var response = await _client.GetAsync($"/api/properties/{propertyId}");

        // Assert
        response.EnsureSuccessStatusCode(); // Throws if not 2xx
        var property = await response.Content.ReadFromJsonAsync<PropertyDetailDto>();
        property.Should().NotBeNull();
        property!.Id.Should().Be(propertyId);
        property.Name.Should().Be("Specific Property");
    }

    [Test]
    public async Task GetPropertyById_WithNonExistentId_ReturnsNotFound()
    {
        // Arrange
        var nonExistentId = Guid.NewGuid();

        // Act
        var response = await _client.GetAsync($"/api/properties/{nonExistentId}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
}