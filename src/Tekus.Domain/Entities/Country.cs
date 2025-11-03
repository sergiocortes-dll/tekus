using System.ComponentModel.DataAnnotations;

namespace Tekus.Domain.Entities;

public class Country
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;
    
    public ICollection<ServiceCountry> ServiceCountry { get; set; } = new List<ServiceCountry>();
    
}