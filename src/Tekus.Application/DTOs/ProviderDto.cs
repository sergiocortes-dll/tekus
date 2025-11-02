using Tekus.Domain.Entities;

namespace Tekus.Application.DTOs;

public class ProviderDto
{
    public int Id { get; set; }
    public string NIT { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}