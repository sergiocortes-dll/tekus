using Tekus.Domain.Entities;

namespace Tekus.Application.DTOs;

public class ProviderDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal HourlyRateUSD { get; set; }
    public int ProviderId { get; set; }
    public ProviderDto Provider { get; set; }
    public List<CountryDto> Countries { get; set; }
}