using Tekus.Application.DTOs;
using Tekus.Domain.Entities;

namespace Tekus.Application.Interfaces;

public interface ICountryService : IGenericService<Country>
{
    Task<IEnumerable<Country>> GetCountriesFromDatabaseAsync();
    Task<IEnumerable<dynamic>> GetCountriesFromExternalServiceAsync();    
    Task<SyncResult> SyncCountriesWithExternalService();
}