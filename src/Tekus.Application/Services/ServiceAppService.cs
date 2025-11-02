using Tekus.Application.Interfaces;
using Tekus.Domain.Entities;
using Tekus.Domain.Interfaces;

namespace Tekus.Application.Services;

public class ServiceAppService : GenericService<Service>, IServiceAppService
{
    public ServiceAppService(IGenericRepository<Service> repository) : base(repository)
    {
    }
}