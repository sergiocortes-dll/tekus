using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tekus.Application.DTOs;
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

    // [HttpGet]
    // public async Task<IActionResult> GetAll()
    // {
    //     var services = await _service.GetAllAsync();
    //     return Ok(services);
    // }
    
    [HttpGet]
    public async Task<ActionResult<PagedResponse<ServiceResponseDto>>> GetPaged([FromQuery] PaginationFilter filter)
    {
        var pagedServices = await _service.GetPagedServicesAsync(filter);
        return Ok(pagedServices);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var service = await _service.GetByIdAsync(id);
        if (service == null) return NotFound();

        ServiceResponseDto dto = ServiceResponseDto.MapToDto(service);
        return Ok(dto);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ServiceRequestDto request)
    {
        try
        {
            var service = await _service.CreateServiceWithCountriesAsync(
                request.Name,
                request.HourlyRateUSD,
                request.ProviderId,
                request.Countries
            );
            
            return Ok(new { 
                message = "Service created successfully", 
                id = service.Id,
                name = service.Name,
                hourlyRateUSD = service.HourlyRateUSD,
                providerId = service.ProviderId
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateServiceRequestDto request)
    {
        try
        {
            var service = await _service.UpdateServiceWithCountriesAsync(
                id,
                request.Name,
                request.HourlyRateUSD,
                request.ProviderId,
                request.Countries
            );
            
            return Ok(new { 
                message = "Service updated successfully", 
                id = service.Id
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
