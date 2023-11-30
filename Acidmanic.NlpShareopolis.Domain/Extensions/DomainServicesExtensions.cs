using EnTier;
using Microsoft.Extensions.DependencyInjection;

namespace Acidmanic.NlpShareopolis.Domain.Extensions;

public static class DomainServicesExtensions
{



    public static IServiceCollection AddDomainServices(this IServiceCollection services)
    {
        var thisAssembly = typeof(DomainServicesExtensions).Assembly;
        
        var essence = services.AddEnTier(thisAssembly);

        services.AddTransient<EnTierEssence>(sp => essence);


        services.AddMediateCore();
        
        services.AddMediateClassesFromAssembly(thisAssembly);

        return services;
    }
}