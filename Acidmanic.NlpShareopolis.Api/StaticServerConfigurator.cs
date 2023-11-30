using System.Net;
using System.Reflection;
using Acidmanic.NlpShareopolis.Api.Extensions;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging.LightWeight;

namespace Acidmanic.NlpShareopolis.Api
{
    public class StaticServerConfigurator
    {
        private readonly string _servingDirectoryName;

        private readonly string _defaultFile;

        private string _frontDirectory;

        private string _indexFile;

        private bool _serveForAngular = false;


        private ILogger _logger = new LoggerAdapter(t => { });

        public StaticServerConfigurator(string servingDirectoryName, string defaultFile)
        {
            _servingDirectoryName = servingDirectoryName;
            _defaultFile = defaultFile;
        }


        public StaticServerConfigurator(string servingDirectoryName) : this(servingDirectoryName, "index.html")
        {
        }

        public StaticServerConfigurator() : this("front-end")
        {
        }

        public StaticServerConfigurator UseLogger(ILogger logger)
        {
            _logger = logger;
            return this;
        }

        public StaticServerConfigurator ServeForAngular()
        {
            _serveForAngular = true;

            return this;
        }

        private static string ExecutableBinariesDirectory()
        {
            var assemblyLocation = Assembly.GetEntryAssembly()?.Location;

            if (!string.IsNullOrEmpty(assemblyLocation))
            {
                var directory = new FileInfo(assemblyLocation).Directory?.FullName;

                if (!string.IsNullOrEmpty(directory))
                {
                    return directory;
                }
            }

            return new DirectoryInfo(".").FullName;
        }
        
        public static WebApplicationBuilder CreateApplicationBuilderOnBinariesSpot()
        {
            var builder = WebApplication.CreateBuilder(new WebApplicationOptions
            {
                ContentRootPath = ExecutableBinariesDirectory()
            });

            return builder;
        }
        
        public void ConfigurePreRouting(IApplicationBuilder app, IHostEnvironment env)
        {
            _frontDirectory = Path.Combine(env.ContentRootPath, _servingDirectoryName);

            _indexFile = Path.Combine(_frontDirectory, _defaultFile);

            if (!Directory.Exists(_frontDirectory))
            {
                Directory.CreateDirectory(_frontDirectory);


                File.WriteAllText(_indexFile,
                    "<H1>Hello!, Apparently I'm being Updated! will be back soon! :D </H1>");
            }

            _logger.LogInformation("Static Pages Root: {Directory}", _frontDirectory);

            var fileProvider = new PhysicalFileProvider(_frontDirectory);


            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = fileProvider,
                RequestPath = "",
                ServeUnknownFileTypes = true
            });
        }


        public void ConfigureMappings(IApplicationBuilder app, IHostEnvironment env)
        {
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

                endpoints.MapGet("/", c => c.Response.WriteAsync(File.ReadAllText(_indexFile)));
            });

            if (_serveForAngular)
            {
                app.Use(async (context, next) =>
                {
                    await next.Invoke();

                    _logger.LogDebug("> request for {RequestUri} got response code {ResponseCode}",
                        context.Request.Path.ToString(), context.Response.StatusCode);

                    if (context.Response.StatusCode == 404)
                    {
                        context.Response.StatusCode = 200;

                        _logger.LogDebug("redirected to index file");

                        var content = await File.ReadAllTextAsync(_indexFile);

                        await context.Response.WriteAsync(content);
                    }
                });
            }
        }
    }
}