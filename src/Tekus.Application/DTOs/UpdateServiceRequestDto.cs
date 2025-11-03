namespace Tekus.Application.DTOs;

public class UpdateServiceRequestDto
{
    public string Name { get; set; } = string.Empty;
    public decimal HourlyRateUSD { get; set; }
    public int ProviderId { get; set; }
    public List<int> Countries { get; set; } = new();
}