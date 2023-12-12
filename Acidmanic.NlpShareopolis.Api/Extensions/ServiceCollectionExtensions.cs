using Acidmanic.NlpShareopolis.Api.Services;

namespace Acidmanic.NlpShareopolis.Api.Extensions;

public static class ServiceCollectionExtensions
{


    public static IServiceCollection AddApiServices(this IServiceCollection services)
    {

        services.AddTransient<SentenceDataMapper>();

        return services;
    }
    
}