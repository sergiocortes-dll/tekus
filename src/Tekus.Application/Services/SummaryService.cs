using Tekus.Application.Interfaces;
using Tekus.Domain.Interfaces;

namespace Tekus.Application.Services;

public class SummaryService : ISummaryService
{
    private readonly ISummaryRepository _repository;

    public SummaryService(ISummaryRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<object> GetsummaryAsync() => await _repository.GetSummaryAsync();
}