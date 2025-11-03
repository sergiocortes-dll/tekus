using Tekus.Application.DTOs;
using Tekus.Application.Interfaces;
using Tekus.Domain.Entities;
using Tekus.Domain.Interfaces;

namespace Tekus.Application.Services;

public class ProviderService : GenericService<Provider>, IProviderService
{
    private readonly IProviderRepository _repository;

    public ProviderService(IProviderRepository repository) : base(repository)
    {
        _repository = repository;
    }
    
    public async Task<PagedResponse<ProviderDto>> GetPagedServicesAsync(PaginationFilter filter)
    {
        var skip = (filter.PageNumber - 1) * filter.PageSize;
        var entities = await _repository.GetPagedAsync(skip, filter.PageSize, filter.Search, filter.SearchField, filter.Sort, filter.SortDirection);

        var dtos = entities.Select(p => new ProviderDto
        {
            Id = p.Id,
            NIT = p.NIT,
            Name = p.Name,
            Email = p.Email
        }).ToList();

        var search = filter.Search?.Trim() ?? string.Empty;

        var totalRecords = await _repository.CountAsync(p =>
            string.IsNullOrEmpty(search) || p.Name.Contains(search)
        );

        return new PagedResponse<ProviderDto>(dtos, filter.PageNumber, filter.PageSize, totalRecords, filter.Sort, filter.SortDirection, filter.Search, filter.SearchField);
    }
}