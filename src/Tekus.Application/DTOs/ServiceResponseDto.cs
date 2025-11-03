using Tekus.Domain.Entities;

namespace Tekus.Application.DTOs;

public class ServiceResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal HourlyRateUSD { get; set; }
    public int ProviderId { get; set; }
    public string ProviderName { get; set; } = string.Empty;
    public List<CountryDto> Countries { get; set; } = new();

    public static ServiceResponseDto MapToDto(Service service)
    {
        return new ServiceResponseDto
        {
            Id = service.Id,
            Name = service.Name,
            HourlyRateUSD = service.HourlyRateUSD,
            ProviderId = service.ProviderId,
            ProviderName = service.Provider.Name,
            Countries = service.ServiceCountry?
                .Select(sc => new CountryDto
                {
                    Id = sc.Country.Id,
                    Name = sc.Country.Name
                })
                .ToList() ?? new List<CountryDto>()
        };
    }
}