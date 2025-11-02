namespace Tekus.Application.DTOs;

public class PaginationFilter
{
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string? Sort { get; set; }
    public string? SortDirection { get; set; } = "asc";
    public string? Search { get; set; }
    public string? SearchField { get; set; }

    public PaginationFilter()
    {
        PageNumber = 1;
        PageSize = 10;
    }
    
    public PaginationFilter(int pageNumber, int pageSize, string? sort, string? sortDirection, string? search)
    {
        PageNumber = pageNumber < 1 ? 1 : pageNumber;
        PageSize = pageSize > 50 ? 50 : pageSize;
        Sort = sort;
        SortDirection = sortDirection;
        Search = search;
    }
}