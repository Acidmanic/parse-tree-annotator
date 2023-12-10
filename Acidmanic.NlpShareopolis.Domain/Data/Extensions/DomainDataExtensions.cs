using Acidmanic.NlpShareopolis.Domain.Data.Repositories.Abstractions;
using Acidmanic.NlpShareopolis.Domain.Data.Repositories.Implementations;
using Acidmanic.NlpShareopolis.Domain.Entities;
using EnTier.Repositories;
using Meadow.Contracts;
using Microsoft.Extensions.DependencyInjection;

namespace Acidmanic.NlpShareopolis.Domain.Data.Extensions;

public static class DomainDataExtensions
{


    public static IServiceCollection AddDomainDataServices(this IServiceCollection services)
    {

        services.AddTransient<IMeadowConfigurationProvider, MeadowConfigurationProvider>();

        services.AddMeadowUnitOfWork<MeadowConfigurationProvider>();

        services.AddTransient<ICrudRepository<SentenceTask, Guid>, SentenceDataRepository>();
        
        services.AddTransient<ISentenceDataRepository, SentenceDataRepository>();

        return services;
    }
}