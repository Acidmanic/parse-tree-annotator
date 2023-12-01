using Meadow.Configuration;
using Meadow.Contracts;
using Microsoft.Extensions.DependencyInjection;

namespace Acidmanic.NlpShareopolis.Domain.Data.Extensions;

public static class DomainDataExtensions
{


    public static IServiceCollection AddDomainDataServices(this IServiceCollection services)
    {

        services.AddTransient<IMeadowConfigurationProvider, MeadowConfigurationProvider>();

        services.AddMeadowUnitOfWork<MeadowConfigurationProvider>();

        return services;
    }
}