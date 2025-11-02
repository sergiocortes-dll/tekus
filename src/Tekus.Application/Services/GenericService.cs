using Tekus.Application.Interfaces;
using Tekus.Domain.Interfaces;

namespace Tekus.Application.Services;

public class GenericService<T> : IGenericService<T> where T : class
{
    private readonly IGenericRepository<T> _repository;

    public GenericService(IGenericRepository<T> repository)
    {
        _repository = repository;
    }

    public virtual async Task<T?> GetByIdAsync(int id) => await _repository.GetByIdAsync(id);

    public async Task<IEnumerable<T>> GetAllAsync() => await _repository.GetAllAsync();

    public async Task AddAsync(T entity)
    {
        await _repository.AddAsync(entity);
        await _repository.SaveChangesAsync();
    }

    public async Task UpdateAsync(T entity)
    {
        await _repository.UpdateAsync(entity);
        await _repository.SaveChangesAsync();
    }

    public async Task DeleteAsync(T entity)
    {
        await _repository.DeleteAsync(entity);
        await _repository.SaveChangesAsync();
    }
}