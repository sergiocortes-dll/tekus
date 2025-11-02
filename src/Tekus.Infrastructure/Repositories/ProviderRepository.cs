using Microsoft.EntityFrameworkCore;
using Tekus.Domain.Entities;
using Tekus.Domain.Interfaces;
using Tekus.Infrastructure.Persistence;

namespace Tekus.Infrastructure.Repositories;

public class ProviderRepository : GenericRepository<Provider>, IProviderRepository
{
    private readonly TekusDbContext _context;
    public ProviderRepository(TekusDbContext context) : base(context)
    {
        _context = context;
    }
    
    public override async Task<IReadOnlyList<Provider>> GetPagedAsync(
        int skip, 
        int take, 
        string? search = null, 
        string? searchField = null,
        string? sort = null, 
        string? sortDirection = null)
    {
        var query = _context.Provider.AsQueryable();
        
        if (!string.IsNullOrEmpty(search) && !string.IsNullOrEmpty(searchField))
        {
            query = searchField.ToLower() switch
            {
                "name" => query.Where(p => p.Name.Contains(search)),
                "email" => query.Where(p => p.Email.Contains(search)),
                "nit" => query.Where(p => p.NIT.Contains(search)),
                _ => query
            };
        }

        query = (sort?.ToLower(), sortDirection?.ToLower()) switch
        {
            ("name", "desc") => query.OrderByDescending(p => p.Name),
            ("name", _) => query.OrderBy(p => p.Name),
            ("email", "desc") => query.OrderByDescending(p => p.Email),
            ("email", _) => query.OrderBy(p => p.Email),
            ("nit", "desc") => query.OrderByDescending(p => p.NIT),
            ("nit", _) => query.OrderBy(p => p.NIT),
            _ => query.OrderBy(p => p.Id)
        };

        return await query.Skip(skip).Take(take).ToListAsync();
    }
}