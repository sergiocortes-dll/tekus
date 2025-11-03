using Tekus.Domain.Entities;

public interface ICountryExternalClient
{
    Task<IEnumerable<Country>> GetCountriesRawAsync();    
    Task<IEnumerable<dynamic>> GetCountriesForServiceAsync();
}