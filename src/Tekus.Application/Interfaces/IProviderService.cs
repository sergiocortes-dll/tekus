using Tekus.Application.DTOs;
using Tekus.Domain.Entities;

namespace Tekus.Application.Interfaces;

public interface IProviderService : IGenericService<Provider>
{
    Task<PagedResponse<ProviderDto>> GetPagedServicesAsync(PaginationFilter filter);
}