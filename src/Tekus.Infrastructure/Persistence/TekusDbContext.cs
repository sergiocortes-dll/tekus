using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Tekus.Domain.Entities;

namespace Tekus.Infrastructure.Persistence;

public class TekusDbContext : DbContext
{
    public DbSet<Provider> Provider { get; set; }
    public DbSet<Service> Service { get; set; }
    public DbSet<Country> Country { get; set; }
    public DbSet<ServiceCountry> ServiceCountry { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer(
                "Data Source=localhost\\SQLEXPRESS;User ID=sa;Password=password;Pooling=False;Connect Timeout=30;Encrypt=True;Database=TekusDb; Trust Server Certificate=True;Authentication=SqlPassword;Application Name=vscode-mssql;Application Intent=ReadWrite;Command Timeout=30")
                .EnableSensitiveDataLogging()
                .LogTo(Console.WriteLine, LogLevel.Error);
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ServiceCountry>()
            .HasKey(sc => new { sc.ServiceId, sc.CountryId });

        modelBuilder.Entity<ServiceCountry>()
            .HasOne(sc => sc.Service)
            .WithMany(s => s.ServiceCountry)
            .HasForeignKey(sc => sc.ServiceId);

        modelBuilder.Entity<ServiceCountry>()
            .HasOne(sc => sc.Country)
            .WithMany(c => c.ServiceCountry)
            .HasForeignKey(sc => sc.CountryId);
    }
}