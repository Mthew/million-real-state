using MediatR;
using Million.Application.DTOs;

namespace Million.Application.Features.Properties.Queries.GetPropertiesList;

public record GetPropertiesListQuery(
    string? Name,
    string? Address,
    decimal? MinPrice,
    decimal? MaxPrice) : IRequest<IEnumerable<PropertyDto>>;