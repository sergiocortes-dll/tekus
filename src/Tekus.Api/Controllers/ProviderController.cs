using Microsoft.AspNetCore.Mvc;
using Tekus.Application.Interfaces;
using Tekus.Domain.Entities;

namespace Tekus.Api.Controllers;

[ApiController]
[Route("/api/provider")]
public class ProviderController : ControllerBase
{
    private readonly IProviderService _service;

    public ProviderController(IProviderService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var providers = await _service.GetAllAsync();
        return Ok(providers);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var provider = await _service.GetByIdAsync(id);
        if (provider == null) return NotFound();

        return Ok(provider);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Provider provider)
    {
        await _service.AddAsync(provider);
        return CreatedAtAction(nameof(GetById), new { id = provider.Id }, provider);
    }

    [HttpPut]
    public async Task<IActionResult> Update(int id, [FromBody] Provider provider)
    {
        if (id != provider.Id) return BadRequest();

        await _service.UpdateAsync(provider);
        return NoContent();
    }
}