using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tekus.Application.Interfaces;
using Tekus.Domain.Entities;

namespace Tekus.Api.Controllers;

[Authorize]
[ApiController]
[Route("/api/country")]
public class CountryController : ControllerBase
{
    private readonly ICountryService _service;

    public CountryController(ICountryService service)
    {
        _service = service;
    }

    [HttpGet("external")]
    public async Task<IActionResult> Get()
    {
        var countries = await _service.GetCountriesFromExternalServiceAsync();

        return Ok(countries);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var countries = await _service.GetCountriesFromDatabaseAsync();
        return Ok(countries);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var country = await _service.GetByIdAsync(id);
        if (country == null) return NotFound();

        return Ok(country);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Country country)
    {
        await _service.AddAsync(country);
        return CreatedAtAction(nameof(GetById), new { id = country.Id }, country);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Country country)
    {
        if (id != country.Id) return BadRequest();

        await _service.UpdateAsync(country);
        return NoContent();
    }
}
