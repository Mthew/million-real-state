using Million.Application.DTOs;
using Million.Domain.Entities;

namespace Million.Application.Interfaces;

public interface IPropertyRepository
{
    Task<Property?> GetByIdAsync(string id);
    Task<IEnumerable<Property>> GetFilteredAsync(string? name, string? address, decimal? minPrice, decimal? maxPrice);
    Task<Property?> GetPropertyDetailByIdAsync(string id);
}