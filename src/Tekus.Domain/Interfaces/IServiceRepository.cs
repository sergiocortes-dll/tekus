using Tekus.Domain.Entities;

namespace Tekus.Domain.Interfaces;

public interface IServiceRepository : IGenericRepository<Service>
{
    Task<IEnumerable<Service>> GetByProviderAsync(int providerId);
}