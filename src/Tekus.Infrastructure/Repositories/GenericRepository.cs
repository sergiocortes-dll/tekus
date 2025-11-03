using Microsoft.EntityFrameworkCore;
using Tekus.Application.DTOs;
using Tekus.Domain.Interfaces;
using Tekus.Infrastructure.Persistence;

namespace Tekus.Infrastructure.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    protected readonly TekusDbContext _context;
    protected readonly DbSet<T> _dbSet;

    public GenericRepository(TekusDbContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>();
    }
    
    public virtual async Task<T?> GetByIdAsync(int id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task<IReadOnlyList<T>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public virtual async Task<IReadOnlyList<T>> GetPagedAsync(int skip, int take, string? search = null, string? searchField = null, string? sort = null, string? sortDirection = null)
    {
        var query = _context.Set<T>().AsQueryable(); // genérico

        return await query.Skip(skip).Take(take).ToListAsync();
    }
    
    public async Task AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
    }

    public async Task UpdateAsync(T entity)
    {
        _dbSet.Update(entity);
    }

    public async Task DeleteAsync(T entity)
    {
        _dbSet.Remove(entity);
    }

    public async Task SaveChangesAsync() => await _context.SaveChangesAsync();
    
    public virtual async Task<int> CountAsync(Func<T, bool>? predicate = null)
    {
        if (predicate == null)
            return await _context.Set<T>().CountAsync();
        else
            return await Task.FromResult(_context.Set<T>().Count(predicate));
    }
}