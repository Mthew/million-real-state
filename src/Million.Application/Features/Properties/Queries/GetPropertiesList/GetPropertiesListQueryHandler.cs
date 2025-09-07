using AutoMapper;
using MediatR;
using Million.Application.DTOs;
using Million.Application.Interfaces;

namespace Million.Application.Features.Properties.Queries.GetPropertiesList;

public class GetPropertiesListQueryHandler : IRequestHandler<GetPropertiesListQuery, IEnumerable<PropertyDto>>
{
    private readonly IPropertyRepository _propertyRepository;
    private readonly IMapper _mapper;

    public GetPropertiesListQueryHandler(IPropertyRepository propertyRepository, IMapper mapper)
    {
        _propertyRepository = propertyRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<PropertyDto>> Handle(GetPropertiesListQuery request, CancellationToken cancellationToken)
    {
        return await _propertyRepository.GetFilteredAsync(
            request.Name,
            request.Address,
            request.MinPrice,
            request.MaxPrice);
    }
}