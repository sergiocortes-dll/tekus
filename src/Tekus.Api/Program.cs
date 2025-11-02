using Tekus.Application.Interfaces;
using Tekus.Application.Services;
using Tekus.Domain.Interfaces;
using Tekus.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped(typeof(IGenericService<>), typeof(GenericService<>));

builder.Services.AddDbContext<Tekus.Infrastructure.Persistence.TekusDbContext>();
// Provider
builder.Services.AddScoped<IProviderRepository, ProviderRepository>();
builder.Services.AddScoped<IProviderService, ProviderService>();
// Country
builder.Services.AddScoped<ICountryRepository, CountryRepository>();
builder.Services.AddScoped<ICountryService, CountryService>();
// Service
builder.Services.AddScoped<IServiceRepository, ServiceRepository>();
builder.Services.AddScoped<IServiceAppService, ServiceAppService>();

// -----
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Middleware
app.UseMiddleware<Tekus.Api.Middleware.AuthMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
