using Tekus.Application.DTOs;

namespace Tekus.Application.Interfaces;

public interface IGenericService<T> where T : class
{
    Task<IEnumerable<T>> GetAllAsync();
    Task<PagedResponse<T>> GetPagedAsync(PaginationFilter filter);
    Task<T?> GetByIdAsync(int id);
    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(T entity);
}