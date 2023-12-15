using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.Services.Abstractions;
using Acidmanic.NlpShareopolis.Domain.Services.Implementations;
using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using EnTier;
using EnTier.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Acidmanic.NlpShareopolis.Domain.Extensions;

public static class DomainServicesExtensions
{



    public static IServiceCollection AddDomainServices(this IServiceCollection services)
    {
        var thisAssembly = typeof(DomainServicesExtensions).Assembly;
        
        var essence = services.AddEnTier(thisAssembly);
        
        services.AddTransient<EnTierEssence>(sp => essence);
        
        
        services.AddMediatR(c => c.RegisterServicesFromAssemblies(thisAssembly));



        services.AddTransient<ISentenceCrudService, SentenceTaskCrudService>();
        services.AddTransient<ICrudService<SentenceTask,Id>, SentenceTaskCrudService>();
        
        services.AddTransient<ISentenceDomainService, SentenceDomainService>();
        services.AddTransient<IExpressionTokenizer,SimpleExpressionTokenizer>();

        return services;
    }
}