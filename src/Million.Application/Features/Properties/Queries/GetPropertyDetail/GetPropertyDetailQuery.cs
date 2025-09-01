using MediatR;
using Million.Application.DTOs;

namespace Million.Application.Features.Properties.Queries.GetPropertyDetail;

public record GetPropertyDetailQuery(string Id) : IRequest<PropertyDetailDto>;