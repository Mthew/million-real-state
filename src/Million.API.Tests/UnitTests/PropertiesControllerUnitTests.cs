using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using FluentAssertions;
using Million.Api.Controllers;
using Million.Application.Features.Properties.Queries.GetPropertiesList;
using Million.Application.Features.Properties.Queries.GetPropertyDetail;
using Million.Application.DTOs;
using MongoDB.Bson;

namespace Million.Api.Tests.UnitTests;

[TestFixture]
public class PropertiesControllerUnitTests
{
    private Mock<ISender> _mockSender = null!;
    private PropertiesController _controller = null!;

    [SetUp]
    public void SetUp()
    {
        // Create a new mock for ISender before each test
        _mockSender = new Mock<ISender>();

        // Create an instance of the controller with the mock
        _controller = new PropertiesController(_mockSender.Object);
    }

    [Test]
    public async Task GetProperties_WhenCalled_ConstructsQueryAndCallsSender()
    {
        // Arrange
        var nameFilter = "Villa";
        var mockResult = new List<PropertyDto> { new() { Id = ObjectId.GenerateNewId().ToString(), Name = "Beach Villa" } };

        // Setup the mock to return our expected result when Send is called with any GetPropertiesListQuery
        _mockSender
            .Setup(s => s.Send(It.IsAny<GetPropertiesListQuery>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(mockResult);

        // Act
        var result = await _controller.GetProperties(nameFilter, null, null, null);

        // Assert
        // 1. Verify that the result is an OkObjectResult
        var okResult = result.Should().BeOfType<OkObjectResult>().Subject;

        // 2. Verify that the value of the result is what we configured the mock to return
        okResult.Value.Should().BeEquivalentTo(mockResult);

        // 3. Verify that the Send method was called exactly once with a query that has the correct name
        _mockSender.Verify(s => s.Send(
            It.Is<GetPropertiesListQuery>(q => q.Name == nameFilter),
            It.IsAny<CancellationToken>()),
            Times.Once);
    }

    [Test]
    public async Task GetPropertyById_WithValidGuid_ConstructsQueryAndCallsSender()
    {
        // Arrange
        var propertyId = ObjectId.GenerateNewId().ToString();
        var mockResult = new PropertyDetailDto { Id = propertyId, Name = "Detailed Property" };

        _mockSender
            .Setup(s => s.Send(It.IsAny<GetPropertyDetailQuery>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(mockResult);

        // Act
        var result = await _controller.GetPropertyById(propertyId.ToString());

        // Assert
        var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        okResult.Value.Should().BeEquivalentTo(mockResult);

        // Verify that Send was called with a query containing the correct ID
        _mockSender.Verify(s => s.Send(
            It.Is<GetPropertyDetailQuery>(q => q.Id == propertyId),
            It.IsAny<CancellationToken>()),
            Times.Once);
    }

    [Test]
    public async Task GetPropertyById_WithInvalidGuid_ReturnsBadRequest()
    {
        // Arrange
        var invalidId = "not-a-object-id";

        // Act
        var result = await _controller.GetPropertyById(invalidId);

        // Assert
        result.Should().BeOfType<BadRequestObjectResult>();

        // Verify that MediatR's Send method was never called
        _mockSender.Verify(s => s.Send(
            It.IsAny<IRequest<PropertyDetailDto>>(),
            It.IsAny<CancellationToken>()),
            Times.Never);
    }
}