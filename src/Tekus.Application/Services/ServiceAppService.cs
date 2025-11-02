using Tekus.Application.DTOs;
using Tekus.Application.Interfaces;
using Tekus.Domain.Entities;
using Tekus.Domain.Interfaces;

namespace Tekus.Application.Services;

public class ServiceAppService : GenericService<Service>, IServiceAppService
{
    private readonly IServiceRepository _repository;
    private readonly ICountryRepository _countryRepository;
    public ServiceAppService(IServiceRepository repository, ICountryRepository countryRepository) : base(repository)
    {
        _repository = repository;
        _countryRepository = countryRepository;
    }

    public override async Task<Service?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }
    
    public async Task<Service> CreateServiceWithCountriesAsync(
        string name, 
        decimal hourlyRate, 
        int providerId, 
        List<int> countryIds)
    {
        var service = new Service
        {
            Name = name,
            HourlyRateUSD = hourlyRate,
            ProviderId = providerId,
            ServiceCountry = new List<ServiceCountry>()
        };
        
        var countries = new List<Country>();
        foreach (var countryId in countryIds)
        {
            var country = await _countryRepository.GetByIdAsync(countryId);
            if (country != null)
            {
                countries.Add(country);
                service.ServiceCountry.Add(new ServiceCountry 
                { 
                    Service = service,
                    Country = country
                });
            }
        }

        await _repository.AddAsync(service);
        await _repository.SaveChangesAsync();

        return service;
    }
    
    public async Task<Service> UpdateServiceWithCountriesAsync(
        int serviceId,
        string name,
        decimal hourlyRate,
        int providerId,
        List<int> countryIds)
    {
        var service = await _repository.GetByIdAsync(serviceId);
        if (service == null)
            throw new Exception($"Service {serviceId} not found");

        service.Name = name;
        service.HourlyRateUSD = hourlyRate;
        service.ProviderId = providerId;

        service.ServiceCountry.Clear();

        foreach (var countryId in countryIds)
        {
            var country = await _countryRepository.GetByIdAsync(countryId);
            if (country != null)
            {
                service.ServiceCountry.Add(new ServiceCountry 
                { 
                    ServiceId = serviceId,
                    CountryId = countryId
                });
            }
        }

        await _repository.UpdateAsync(service);
        await _repository.SaveChangesAsync();
    
        return service;
    }

    public async Task<PagedResponse<ServiceResponseDto>> GetPagedServicesAsync(PaginationFilter filter)
    {
        var skip = (filter.PageNumber - 1) * filter.PageSize;
        var entities = await _repository.GetPagedAsync(skip, filter.PageSize, filter.Search, filter.Sort, filter.SortDirection);

        var dtos = entities.Select(s => new ServiceResponseDto
        {
            Id = s.Id,
            Name = s.Name,
            HourlyRateUSD = s.HourlyRateUSD,
            ProviderId = s.ProviderId,
            ProviderName = s.Provider.Name,
            Countries = s.ServiceCountry
                .Select(sc => new CountryDto { Id = sc.Country.Id, Name = sc.Country.Name })
                .ToList()
        }).ToList();

        var search = filter.Search?.Trim() ?? string.Empty;

        var totalRecords = await _repository.CountAsync(s =>
            s.Name.Contains(search) ||
            (s.Provider != null && s.Provider.Name.Contains(search))
        );

        return new PagedResponse<ServiceResponseDto>(dtos, filter.PageNumber, filter.PageSize, totalRecords, filter.Sort, filter.SortDirection, filter.Search);
    }
}