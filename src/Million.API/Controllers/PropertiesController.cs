using MediatR;
using Microsoft.AspNetCore.Mvc;
using Million.Application.Features.Properties.Queries.GetPropertiesList;
using Million.Application.Features.Properties.Queries.GetPropertyDetail;
using MongoDB.Bson;


namespace Million.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropertiesController : ControllerBase
{
    private readonly ISender _sender;

    public PropertiesController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<IActionResult> GetProperties(
        [FromQuery] string? name,
        [FromQuery] string? address,
        [FromQuery] decimal? minPrice,
        [FromQuery] decimal? maxPrice)
    {
        var query = new GetPropertiesListQuery(name, address, minPrice, maxPrice);
        var result = await _sender.Send(query);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPropertyById(string id)
    {
        if (!ObjectId.TryParse(id, out _))
        {
            return BadRequest("The provided ID is not a valid ObjectId format.");
        }
        var query = new GetPropertyDetailQuery(id);
        var result = await _sender.Send(query);
        return Ok(result);
    }
}