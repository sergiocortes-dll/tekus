using Microsoft.EntityFrameworkCore;
using Tekus.Domain.Entities;
using Tekus.Infrastructure.Persistence;
using Tekus.Infrastructure.Repositories;

namespace Tekus.Tests.Repositories;

public class GenericRepositoryTests
{
    private TekusDbContext GetInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<TekusDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .EnableSensitiveDataLogging()
            .Options;

        return new TekusDbContext(options);
    }

     [Fact]
        public async Task AddAsync_ShouldAddEntityToDatabase()
        {
            // Arrange
            using var context = GetInMemoryDbContext();
            var repository = new GenericRepository<Provider>(context);

            var provider = new Provider { Id = 1, Name = "Test Provider" };

            // Act
            await repository.AddAsync(provider);
            await repository.SaveChangesAsync();

            // Assert
            var result = await repository.GetByIdAsync(1);
            Assert.NotNull(result);
            Assert.Equal("Test Provider", result!.Name);
        }

        [Fact]
        public async Task GetAllAsync_ShouldReturnAllEntities()
        {
            // Arrange
            using var context = GetInMemoryDbContext();
            var repository = new GenericRepository<Provider>(context);

            await repository.AddAsync(new Provider { Id = 1, Name = "Provider A" });
            await repository.AddAsync(new Provider { Id = 2, Name = "Provider B" });
            await repository.SaveChangesAsync();

            // Act
            var result = await repository.GetAllAsync();

            // Assert
            Assert.Equal(2, result.Count);
        }

        [Fact]
        public async Task GetPagedAsync_ShouldReturnCorrectNumberOfEntities()
        {
            // Arrange
            using var context = GetInMemoryDbContext();
            var repository = new GenericRepository<Provider>(context);

            for (int i = 1; i <= 10; i++)
                await repository.AddAsync(new Provider { Id = i, Name = $"Provider {i}" });
            await repository.SaveChangesAsync();

            // Act
            var paged = await repository.GetPagedAsync(0, 5);

            // Assert
            Assert.Equal(5, paged.Count);
            Assert.Equal("Provider 1", paged.First().Name);
        }

        [Fact]
        public async Task UpdateAsync_ShouldModifyEntity()
        {
            // Arrange
            using var context = GetInMemoryDbContext();
            var repository = new GenericRepository<Provider>(context);

            var provider = new Provider { Id = 1, Name = "Old Name" };
            await repository.AddAsync(provider);
            await repository.SaveChangesAsync();

            provider.Name = "Updated Name";
            await repository.UpdateAsync(provider);
            await repository.SaveChangesAsync();

            // Assert
            var updated = await repository.GetByIdAsync(1);
            Assert.Equal("Updated Name", updated!.Name);
        }

        [Fact]
        public async Task DeleteAsync_ShouldRemoveEntity()
        {
            // Arrange
            using var context = GetInMemoryDbContext();
            var repository = new GenericRepository<Provider>(context);

            var provider = new Provider { Id = 1, Name = "To Delete" };
            await repository.AddAsync(provider);
            await repository.SaveChangesAsync();

            // Act
            await repository.DeleteAsync(provider);
            await repository.SaveChangesAsync();

            // Assert
            var deleted = await repository.GetByIdAsync(1);
            Assert.Null(deleted);
        }

        [Fact]
        public async Task CountAsync_ShouldReturnCorrectCount()
        {
            // Arrange
            using var context = GetInMemoryDbContext();
            var repository = new GenericRepository<Provider>(context);

            await repository.AddAsync(new Provider { Id = 1, Name = "A" });
            await repository.AddAsync(new Provider { Id = 2, Name = "B" });
            await repository.AddAsync(new Provider { Id = 3, Name = "C" });
            await repository.SaveChangesAsync();

            // Act
            var total = await repository.CountAsync();
            var filtered = await repository.CountAsync(p => p.Name.StartsWith("A"));

            // Assert
            Assert.Equal(3, total);
            Assert.Equal(1, filtered);
        }
}