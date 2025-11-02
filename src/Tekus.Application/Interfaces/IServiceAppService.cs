using Tekus.Application.DTOs;
using Tekus.Domain.Entities;

namespace Tekus.Application.Interfaces;

public interface IServiceAppService : IGenericService<Service>
{
    Task<Service> CreateServiceWithCountriesAsync(string name, decimal hourlyRate, int providerId, List<int> countryIds);
    Task<Service> UpdateServiceWithCountriesAsync(int serviceId, string name, decimal hourlyRate, int providerId, List<int> countryIds);
    Task<PagedResponse<ServiceResponseDto>> GetPagedServicesAsync(PaginationFilter filter);
}