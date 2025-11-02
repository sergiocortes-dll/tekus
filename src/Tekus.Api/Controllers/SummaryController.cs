using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tekus.Application.Interfaces;

namespace Tekus.Api.Controllers;

[Authorize]
[ApiController]
[Route("/api/summary")]
public class SummaryController : ControllerBase
{
    private readonly ISummaryService _service;

    public SummaryController(ISummaryService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetSummary()
    {
        var summary = await _service.GetsummaryAsync();
        return Ok(summary);
    }
}