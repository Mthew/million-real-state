using AutoMapper;
using MediatR;
using Million.Application.DTOs;
using Million.Application.Interfaces;
using Million.Domain.Exceptions;

namespace Million.Application.Features.Properties.Queries.GetPropertyDetail;

public class GetPropertyDetailQueryHandler : IRequestHandler<GetPropertyDetailQuery, PropertyDetailDto>
{
    private readonly IPropertyRepository _propertyRepository;
    private readonly IMapper _mapper;

    public GetPropertyDetailQueryHandler(IPropertyRepository propertyRepository, IMapper mapper)
    {
        _propertyRepository = propertyRepository;
        _mapper = mapper;
    }

    public async Task<PropertyDetailDto> Handle(GetPropertyDetailQuery request, CancellationToken cancellationToken)
    {
        var propertyDetail = await _propertyRepository.GetPropertyDetailByIdAsync(request.Id);

        if (propertyDetail is null)
        {
            throw new PropertyNotFoundException(request.Id);
        }

        return _mapper.Map<PropertyDetailDto>(propertyDetail);
    }
}