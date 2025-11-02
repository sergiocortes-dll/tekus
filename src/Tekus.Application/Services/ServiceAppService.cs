using Tekus.Application.Interfaces;
using Tekus.Domain.Entities;
using Tekus.Domain.Interfaces;

namespace Tekus.Application.Services;

public class ServiceAppService : GenericService<Service>, IServiceAppService
{
    private readonly IServiceRepository _repository;
    public ServiceAppService(IServiceRepository repository) : base(repository)
    {
        _repository = repository;
    }

     public override async Task<Service?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }
}