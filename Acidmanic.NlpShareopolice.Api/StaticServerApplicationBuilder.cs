using System.Net;
using System.Reflection;
using Acidmanic.NlpShareopolice.Api.Extensions;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging.LightWeight;

namespace Acidmanic.NlpShareopolice.Api
{
    public class StaticServerApplicationBuilder:StaticServerConfigurator
    {
        
        

        public WebApplication Build()
        {
            var builder = CreateApplicationBuilderOnBinariesSpot();

            builder.ConfigureListening("StaticServer:Endpoints");

            builder.Services.AddControllers();

            var application = builder.Build();

            application.UseCors(p => p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            if (application.Environment.IsDevelopment())
            {
                application.UseDeveloperExceptionPage();
            }

            application.UseHttpsRedirection();

            ConfigurePreRouting(application, application.Environment);

            application.UseRouting();

            application.MapControllers();

            ConfigureMappings(application, application.Environment);

            return application;
        }
    }
}