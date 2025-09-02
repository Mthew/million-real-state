using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Million.Application.Interfaces;
using Million.Infrastructure.Persistence;
using Million.Infrastructure.Persistence.Mappings;
using Million.Infrastructure.Persistence.Repositories;
using Million.Infrastructure.Settings;

namespace Million.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // 1. Configure MongoDB Mappings
        MongoDbMapper.Configure();

        // 2. Configure Settings
        services.Configure<MongoDbSettings>(
         configuration.GetSection(MongoDbSettings.SectionName));

        // 3. Register DbContext
        services.AddSingleton<MongoDbContext>(sp =>
        {
            // Get the IOptions<MongoDbSettings> service that we just configured.
            var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>();

            // Create a new instance of MongoDbContext using the constructor that takes IOptions.
            return new MongoDbContext(settings);
        });

        // 4. Register Repositories
        services.AddScoped<IPropertyRepository, PropertyRepository>();
        // Add other repositories here...

        return services;
    }
}