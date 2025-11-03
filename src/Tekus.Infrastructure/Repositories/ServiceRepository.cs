using Microsoft.EntityFrameworkCore;
using Tekus.Application.DTOs;
using Tekus.Domain.Entities;
using Tekus.Domain.Interfaces;
using Tekus.Infrastructure.Persistence;

namespace Tekus.Infrastructure.Repositories;

public class ServiceRepository : GenericRepository<Service>, IServiceRepository
{
    private readonly TekusDbContext _context;
    public ServiceRepository(TekusDbContext context) : base(context)
    {
        _context = context;
    }

    public override async Task<Service?> GetByIdAsync(int id)
    {
        var service = await _context.Service
            .Include(s => s.Provider)
            .Include(s => s.ServiceCountry)
                .ThenInclude(sc => sc.Country)
            .FirstOrDefaultAsync(s => s.Id == id);

        return service;
    }

    public override async Task<IReadOnlyList<Service>> GetPagedAsync(
        int skip,
        int take,
        string? search = null,
        string? searchField = null,
        string? sort = null,
        string? sortDirection = null)
    {
        var query = _context.Service
            .Include(s => s.Provider)
            .Include(s => s.ServiceCountry)
            .ThenInclude(sc => sc.Country)
            .AsQueryable();

        if (!string.IsNullOrEmpty(search) && !string.IsNullOrEmpty(searchField))
        {
            query = searchField.ToLower() switch
            {
                "name" => query.Where(s => s.Name.Contains(search)),
                "hourlyrateusd" => query.Where(s => s.HourlyRateUSD.ToString().Contains(search)),
                "providername" => query.Where(s => s.Provider.Name.Contains(search)),
                _ => query
            };
        }

        query = (sort?.ToLower(), sortDirection?.ToLower()) switch
        {
            ("name", "desc") => query.OrderByDescending(s => s.Name),
            ("name", _) => query.OrderBy(s => s.Name),
            ("hourlyrate", "desc") => query.OrderByDescending(s => s.HourlyRateUSD),
            ("hourlyrate", _) => query.OrderBy(s => s.HourlyRateUSD),
            ("provider", "desc") => query.OrderByDescending(s => s.Provider != null ? s.Provider.Name : string.Empty),
            ("provider", _) => query.OrderBy(s => s.Provider != null ? s.Provider.Name : string.Empty),
            _ => query.OrderBy(s => s.Id)
        };

        return await query.Skip(skip).Take(take).ToListAsync();
    }
    
    public async Task<IEnumerable<Service>> GetByProviderAsync(int providerId)
    {
        return await _context.Service
            .Where(s => s.ProviderId == providerId)
            .Include(s => s.Provider)
            .Include(s => s.ServiceCountry)
                .ThenInclude(sc => sc.Country)
            .ToListAsync();
    }
}