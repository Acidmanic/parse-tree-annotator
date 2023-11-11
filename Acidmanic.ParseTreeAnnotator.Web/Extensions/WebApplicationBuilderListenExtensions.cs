using System.Net;

namespace Acidmanic.ParseTreeAnnotator.Web.Extensions;

public static class WebApplicationBuilderListenExtensions
{
    public static WebApplicationBuilder ConfigureListening(this WebApplicationBuilder builder,
        string configurationPath, params string[] endpointNames)
    {
        var endpoints = builder.Configuration.GetSection(configurationPath).GetChildren();

        foreach (var ep in endpoints)
        {
            if (endpointNames.Length == 0 || endpointNames.Contains(ep.Key))
            {

                var configurationIp = ep["Url"];

                if (!string.IsNullOrWhiteSpace(configurationIp))
                {
                    var url = new Uri(configurationIp);

                    builder.WebHost.ConfigureKestrel(serverOptions =>
                    {
                        serverOptions.ConfigureHttpsDefaults(listenOptions => { });

                        var ip = IPAddress.Parse(url.Host);

                        serverOptions.Listen(ip, url.Port,
                            op =>
                            {
                                if (configurationIp.ToLower().StartsWith("https"))
                                {
                                    op.UseHttps();
                                }
                            });
                    });
                }
            }
        }


        return builder;
    }
}