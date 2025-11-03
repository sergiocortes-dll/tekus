using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Tekus.Infrastructure.Persistence;

namespace Tekus.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");
    
        services.AddDbContext<TekusDbContext>(options =>
            options.UseSqlServer(connectionString));
    
        return services;
    }
}