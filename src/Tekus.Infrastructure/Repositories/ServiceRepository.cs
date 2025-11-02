using Microsoft.EntityFrameworkCore;
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
}