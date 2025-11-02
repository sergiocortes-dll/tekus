using Microsoft.EntityFrameworkCore;
using Tekus.Domain.Interfaces;
using Tekus.Infrastructure.Persistence;

namespace Tekus.Infrastructure.Repositories;

public class SummaryRepository : ISummaryRepository
{
    private readonly TekusDbContext _context;

    public SummaryRepository(TekusDbContext context)
    {
        _context = context;
    }
    
    public async Task<object> GetSummaryAsync()
    {
        var providersPerCountry = await _context.ServiceCountry
            .GroupBy(sc => sc.CountryId)
            .Select(g => new { CountryId = g.Key, Count = g.Select(sc => sc.Service.ProviderId).Distinct().Count() })
            .ToListAsync();

        var servicesPerCountry = await _context.ServiceCountry
            .GroupBy(sc => sc.CountryId)
            .Select(g => new { CountryId = g.Key, Count = g.Count() })
            .ToListAsync();
        
        return new { ProvidersPerCountry = providersPerCountry, ServicesPerCountry = servicesPerCountry };    }
}