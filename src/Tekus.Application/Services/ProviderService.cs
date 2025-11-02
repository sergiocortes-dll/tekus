using Tekus.Application.Interfaces;
using Tekus.Domain.Entities;
using Tekus.Domain.Interfaces;

namespace Tekus.Application.Services;

public class ProviderService : GenericService<Provider>, IProviderService
{
    public ProviderService(IGenericRepository<Provider> repository) : base(repository)
    {
    }
}