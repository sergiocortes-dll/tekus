using System.ComponentModel.DataAnnotations;

namespace Tekus.Domain.Entities;

public class Service
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [Range(0.01, double.MaxValue)]
    public decimal HourlyRateUSD { get; set; }

    public int ProviderId { get; set; }
    public Provider? Provider { get; set; }
    
    public ICollection<ServiceCountry> ServiceCountry { get; set; } = new List<ServiceCountry>();
}