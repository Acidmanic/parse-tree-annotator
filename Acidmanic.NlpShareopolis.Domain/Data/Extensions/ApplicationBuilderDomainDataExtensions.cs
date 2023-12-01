using System.Diagnostics;
using Meadow;
using Meadow.Microsoft.Extensions.DependencyInjection;
using Meadow.MySql;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.LightWeight;

namespace Acidmanic.NlpShareopolis.Domain.Data.Extensions;

public static class ApplicationBuilderDomainDataExtensions
{





    public static IApplicationBuilder ConfigureMeadow(this IApplicationBuilder app)
    {

        app.ApplicationServices.ConfigureMeadow((e, l) =>
        {
            MeadowEngine.UseLogger(l);

            e.UseMySql();
            
            if (e.DatabaseExists())
            {
                l.LogInformation("Dropping Existing Database");
                
                e.DropDatabase();
            }
            
            l.LogInformation("Creating Brand New Database");
            
            e.CreateDatabase();
            
            l.LogInformation("Building Up Database Structure");
            
            e.BuildUpDatabase();
            
        });

        return app;
    }
}