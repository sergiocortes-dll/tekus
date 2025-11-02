using Tekus.Application.DTOs;
using Tekus.Application.Interfaces;
using Tekus.Domain.Entities;
using Tekus.Domain.Interfaces;

namespace Tekus.Application.Services;

public class CountryService : GenericService<Country>, ICountryService
{
    private readonly ICountryRepository _countryRepository;
    private readonly ICountryExternalClient _countryExternalClient;
    public CountryService(IGenericRepository<Country> repository, ICountryRepository countryRepository, ICountryExternalClient countryExternalClient) : base(repository)
    {
        _countryRepository = countryRepository;
        _countryExternalClient = countryExternalClient;
    }

    public async Task<IEnumerable<Country>> GetCountriesFromDatabaseAsync()
    {
        return await _countryRepository.GetAllAsync();
    }

    public async Task<IEnumerable<dynamic>> GetCountriesFromExternalServiceAsync()
    {
        return await _countryExternalClient.GetCountriesForServiceAsync();
    }

    public async Task<SyncResult> SyncCountriesWithExternalService()
    {
        try
        {
            var externalCountries = await _countryExternalClient.GetCountriesRawAsync();
            var existingCountries = await _countryRepository.GetAllAsync();

            var existingCountryNames = existingCountries.Select(ec => ec.Name).ToHashSet();
            var addedCountries = new List<Country>();

            foreach (var externalCountry in externalCountries)
            {
                if (!existingCountryNames.Contains(externalCountry.Name))
                {
                    var newCountry = new Country { Name = externalCountry.Name };
                    addedCountries.Add(newCountry);
                    await _countryRepository.AddAsync(newCountry);
                }
            }

            if (addedCountries.Any())
            {
                await _countryRepository.SaveChangesAsync();
            }

            return new SyncResult
            {
                Success = true,
                AddedCount = addedCountries.Count,
                UpdatedCount = 0,
                TotalCount = externalCountries.Count()
            };
        }
        catch (Exception ex)
        {
            return new SyncResult
            {
                Success = false,
                ErrorMessage = ex.Message
            };
        }
    }
}