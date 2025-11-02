using System.Text.Json;
using Tekus.Domain.Entities;

public class CountryExternalClient : ICountryExternalClient
{
    private readonly HttpClient _httpClient;

    public CountryExternalClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    
    public async Task<IEnumerable<Country>> GetCountriesRawAsync()
    {
        var response = await _httpClient.GetAsync("https://restcountries.com/v3.1/all?fields=name");
        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();
        var countriesData = JsonSerializer.Deserialize<List<Dictionary<string, JsonElement>>>(json);

        return countriesData.Select(c => new Country
        {
            Name = c["name"].GetProperty("common").GetString()
        });
    }

    public async Task<IEnumerable<dynamic>> GetCountriesForServiceAsync()
    {
        var response = await _httpClient.GetAsync("https://restcountries.com/v3.1/all?fields=name");
        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();
        var countriesData = JsonSerializer.Deserialize<List<Dictionary<string, JsonElement>>>(json);

        return countriesData.Select(c => new 
        {
            Name = c["name"].GetProperty("common").GetString()
        }).ToList();
    }
}