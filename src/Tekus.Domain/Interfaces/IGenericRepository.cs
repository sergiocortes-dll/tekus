namespace Tekus.Domain.Interfaces;

public interface IGenericRepository<T> where T : class
{
    Task<T?> GetByIdAsync(int id);
    Task<IReadOnlyList<T>> GetAllAsync();
    Task<IReadOnlyList<T>> GetPagedAsync(int skip, int take, string? search = null, string? sort = null, string? sortDirection = null);

    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(T entity);
    Task SaveChangesAsync();
    
    Task<int> CountAsync(Func<T, bool>? predicate = null);
}