using Microsoft.Extensions.DependencyInjection;
using Million.Application.Mappings;
using System.Reflection;

namespace Million.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // Register AutoMapper and find profiles in the current assembly
        //services.AddAutoMapper(Assembly.GetExecutingAssembly());
        //services.AddAutoMapper(typeof(PropertyProfile).Assembly);
        services.AddAutoMapper(cfg =>
        {
            cfg.AddProfile<PropertyProfile>();
            // Add other profiles here
        }, Assembly.GetExecutingAssembly());

        // Register MediatR and find handlers in the current assembly
        services.AddMediatR(cfg =>
            cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

        return services;
    }
}