using System.ComponentModel.DataAnnotations;
using System.ComponentModel.Design;

namespace Tekus.Domain.Entities;

public class Provider
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string NIT { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(100)]
    public string Email { get; set; } = string.Empty;

    public string? CustomFields { get; set; }
    public ICollection<Service> Services { get; set; } = new List<Service>();
}