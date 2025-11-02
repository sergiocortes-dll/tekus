using Tekus.Application.Interfaces;
using Tekus.Application.Services;
using Tekus.Domain.Interfaces;
using Tekus.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Tekus.Infrastructure.BackgroundServices;

var builder = WebApplication.CreateBuilder(args);

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});


// Add services to the container.
builder.Services.AddHttpClient<ICountryExternalClient, CountryExternalClient>();

builder.Services.AddDbContext<Tekus.Infrastructure.Persistence.TekusDbContext>();

// Generic
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped(typeof(IGenericService<>), typeof(GenericService<>));

// Provider
builder.Services.AddScoped<IProviderRepository, ProviderRepository>();
builder.Services.AddScoped<IProviderService, ProviderService>();
// Country
builder.Services.AddScoped<ICountryRepository, CountryRepository>();
builder.Services.AddScoped<ICountryService, CountryService>();
// Service
builder.Services.AddScoped<IServiceRepository, ServiceRepository>();
builder.Services.AddScoped<IServiceAppService, ServiceAppService>();
// Summary
builder.Services.AddScoped<ISummaryRepository, SummaryRepository>();
builder.Services.AddScoped<ISummaryService, SummaryService>();

//
builder.Services.AddHostedService<CountrySyncBackgroundService>();

// -----
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Auth Controller
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "https://localhost:5290",
            ValidAudience = "https://localhost:5290",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("EsteEsUnEjemploDeClaveMuySeguraDe32Caracteres"))
        };
    });

var app = builder.Build();

// CORS
app.UseCors("AllowFrontend");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
