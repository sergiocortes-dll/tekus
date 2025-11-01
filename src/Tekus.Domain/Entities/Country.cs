using System.ComponentModel.DataAnnotations;

namespace Tekus.Domain.Entities;

public class Country
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    public ICollection<Service> Services { get; set; } = new List<Service>();
}