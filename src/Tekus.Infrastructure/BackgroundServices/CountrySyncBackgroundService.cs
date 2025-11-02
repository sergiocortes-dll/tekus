using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Tekus.Application.Interfaces;

namespace Tekus.Infrastructure.BackgroundServices;

public class CountrySyncBackgroundService : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<CountrySyncBackgroundService> _logger;
    private readonly TimeSpan _syncInterval = TimeSpan.FromHours(24);

    public CountrySyncBackgroundService(IServiceScopeFactory scopeFactory, ILogger<CountrySyncBackgroundService> logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Country Sync Background Service started");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                using (var scope = _scopeFactory.CreateScope())
                {
                    var countryService = scope.ServiceProvider.GetRequiredService<ICountryService>(); 
                    await countryService.SyncCountriesWithExternalService();
                }
                _logger.LogInformation("Countries synchronized successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error synchronizing countries");
            }

            await Task.Delay(_syncInterval, stoppingToken);
        }
    }
}