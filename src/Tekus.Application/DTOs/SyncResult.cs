namespace Tekus.Application.DTOs;

public class SyncResult
{
    public bool Success { get; set; }
    public int AddedCount { get; set; }
    public int UpdatedCount { get; set; }
    public int TotalCount { get; set; }
    public string ErrorMessage { get; set; }
}