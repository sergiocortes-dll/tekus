namespace Tekus.Domain.Interfaces;

public interface ISummaryRepository
{
    Task<object> GetSummaryAsync();
}