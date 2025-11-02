namespace Tekus.Domain.Entities;

public class ServiceCountry
{
    public int ServiceId { get; set; }
    public Service Service { get; set; } = new();
    
    public int CountryId { get; set; }
    public Country Country { get; set; } = new();
}