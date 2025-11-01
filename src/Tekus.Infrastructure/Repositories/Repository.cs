using Microsoft.EntityFrameworkCore;
using Tekus.Domain.Interfaces;
using Tekus.Infrastructure.Persistence;

namespace Tekus.Infrastructure.Repositories;

public class Repository<T> : IRepository<T> where T : class
{
    protected readonly TekusDbContext _context;
    protected readonly DbSet<T> _dbSet;

    public Repository(TekusDbContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>();
    }
    
    public async Task<T?> GetByIdAsync(int id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task<IReadOnlyList<T>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
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
}