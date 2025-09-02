using AutoMapper;
using Million.Application.DTOs;
using Million.Domain.Entities;

namespace Million.Application.Mappings;

public class PropertyProfile : Profile
{
    public PropertyProfile()
    {
        CreateMap<Property, PropertyDto>().ReverseMap();
        CreateMap<Property, PropertyDetailDto>().ReverseMap();
        CreateMap<PropertyImage, PropertyImageDto>().ReverseMap();
        CreateMap<PropertyTrace, PropertyTraceDto>().ReverseMap();
        CreateMap<Owner, OwnerDto>().ReverseMap();
        CreateMap<PropertyDetail, PropertyDetailDto>().ReverseMap();
    }
}