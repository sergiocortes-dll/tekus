namespace Tekus.Application.DTOs;

public class PagedResponse<T>
{
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
    public int TotalRecords { get; set; }
    public string? Sort { get; set; }
    public string? SortDirection { get; set; }
    public string? Search { get; set; }
    public string? SearchField { get; set; }
    public IEnumerable<T> Data { get; set; }

    public PagedResponse(IEnumerable<T> data, int pageNumber, int pageSize, int totalRecords, string? sort, string? sortDirection, string? search, string? searchField)
    {
        PageNumber = pageNumber;
        PageSize = pageSize;
        TotalRecords = totalRecords;
        TotalPages = (int)Math.Ceiling((double)totalRecords / pageSize);
        Sort = sort;
        SortDirection = sortDirection;
        Search = search;
        SearchField = searchField;
        Data = data;
    }
}