using Tekus.Application.Interfaces;
using Tekus.Domain.Entities;
using Tekus.Domain.Interfaces;

namespace Tekus.Application.Services;

public class CountryService : GenericService<Country>, ICountryService
{
    public CountryService(IGenericRepository<Country> repository) : base(repository)
    {
    }
}