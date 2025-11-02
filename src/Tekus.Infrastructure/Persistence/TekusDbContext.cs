using Microsoft.EntityFrameworkCore;
using Tekus.Domain.Entities;

namespace Tekus.Infrastructure.Persistence;

public class TekusDbContext : DbContext
{
    public DbSet<Provider> Provider { get; set; }
    public DbSet<Service> Service { get; set; }
    public DbSet<Country> Country { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer(
                "Data Source=localhost\\SQLEXPRESS;User ID=sa;Password=password;Pooling=False;Connect Timeout=30;Encrypt=True;Database=TekusDb; Trust Server Certificate=True;Authentication=SqlPassword;Application Name=vscode-mssql;Application Intent=ReadWrite;Command Timeout=30");
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Service>()
            .HasOne(s => s.Provider)
            .WithMany(p => p.Services)
            .HasForeignKey(s => s.ProviderId);

        modelBuilder.Entity<Service>()
            .HasMany(s => s.Countries)
            .WithMany(c => c.Services)
            .UsingEntity<Dictionary<string, object>>(
                "ServiceCountry",
                j => j.HasOne<Country>().WithMany().HasForeignKey("CountryId"),
                j => j.HasOne<Service>().WithMany().HasForeignKey("ServiceId"),
                j =>
                {
                    j.HasKey("ServiceId", "CountryId");
                });
        
        base.OnModelCreating(modelBuilder);
    }
}