using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tekus.Application.Interfaces;
using Tekus.Domain.Entities;

namespace Tekus.Api.Controllers;

[Authorize]
[ApiController]
[Route("/api/service")]
public class ServiceController : ControllerBase
{
    private readonly IServiceAppService _service;

    public ServiceController(IServiceAppService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var services = await _service.GetAllAsync();
        return Ok(services);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var service = await _service.GetByIdAsync(id);
        if  (service == null) return NotFound();

        return Ok(service);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Service serviceApp)
    {
        await _service.AddAsync(serviceApp);
        return CreatedAtAction(nameof(GetById),  new { id = serviceApp.Id }, serviceApp);
    }

    [HttpPut]
    public async Task<IActionResult> Update(int id, [FromBody] Service serviceApp)
    {
        if (id != serviceApp.Id) return BadRequest();

        await _service.UpdateAsync(serviceApp);
        return NoContent();
    }
}
