using System.Net.Http.Headers;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.OAuth;
using Newtonsoft.Json.Linq;

namespace Acidmanic.ParseTreeAnnotator.Web.Extensions;

public static class GithubAuthenticationExtensions
{
    public static IServiceCollection AddGithubAuthentication(this IServiceCollection services)
    {
        services.AddAuthentication()
            .AddOAuth("Github", "Login Using Github Account",
                options =>
                {
                    options.SignInScheme = "GitHub";
                    options.ClientId = "f52235de4632fa707792";
                    options.ClientSecret = "864cc783b782ddbc2d354133e4d44bc0cacf43cd";
                    options.CallbackPath = new PathString("/signin-github");
                    options.AuthorizationEndpoint = "https://github.com/login/oauth/authorize";
                    options.TokenEndpoint = "https://github.com/login/oauth/access_token";
                    options.UserInformationEndpoint = "https://api.github.com/user";
                    options.ClaimsIssuer = "OAuth2-Github";
                    // Retrieving user information is unique to each provider.
                    options.Events = new OAuthEvents
                    {
                        OnCreatingTicket = async context => { await CreateGitHubAuthTicket(context); }
                    };
                });
        return services;
    }


    public static IApplicationBuilder UseGithubAuthentication(this IApplicationBuilder app)
    {
        return app;
    }
    //
    // private static OAuthOptions GitHubOptions =>
    //     new OAuthOptions
    //     {
    //         SignInScheme = "GitHub",
    //         ClientId = "f52235de4632fa707792",
    //         ClientSecret = "864cc783b782ddbc2d354133e4d44bc0cacf43cd",
    //         CallbackPath = new PathString("/signin-github"),
    //         AuthorizationEndpoint = "https://github.com/login/oauth/authorize",
    //         TokenEndpoint = "https://github.com/login/oauth/access_token",
    //         UserInformationEndpoint = "https://api.github.com/user",
    //         ClaimsIssuer = "OAuth2-Github",
    //
    //         // Retrieving user information is unique to each provider.
    //         Events = new OAuthEvents
    //         {
    //             OnCreatingTicket = async context => { await CreateGitHubAuthTicket(context); }
    //         }
    //     };

    private static async Task CreateGitHubAuthTicket(OAuthCreatingTicketContext context)
    {
        // Get the GitHub user
        var request = new HttpRequestMessage(HttpMethod.Get, context.Options.UserInformationEndpoint);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", context.AccessToken);
        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        var response = await context.Backchannel.SendAsync(request, context.HttpContext.RequestAborted);
        response.EnsureSuccessStatusCode();

        var user = JObject.Parse(await response.Content.ReadAsStringAsync());

        AddClaims(context, user);
    }

    private static void AddClaims(OAuthCreatingTicketContext context, JObject user)
    {
        var identifier = user.Value<string>("id");
        if (!string.IsNullOrEmpty(identifier))
        {
            context.Identity.AddClaim(new Claim(
                ClaimTypes.NameIdentifier, identifier,
                ClaimValueTypes.String, context.Options.ClaimsIssuer));
        }

        var userName = user.Value<string>("login");
        if (!string.IsNullOrEmpty(userName))
        {
            context.Identity.AddClaim(new Claim(
                ClaimsIdentity.DefaultNameClaimType, userName,
                ClaimValueTypes.String, context.Options.ClaimsIssuer));
        }

        var name = user.Value<string>("name");
        if (!string.IsNullOrEmpty(name))
        {
            context.Identity.AddClaim(new Claim(
                "urn:github:name", name,
                ClaimValueTypes.String, context.Options.ClaimsIssuer));
        }

        var link = user.Value<string>("url");
        if (!string.IsNullOrEmpty(link))
        {
            context.Identity.AddClaim(new Claim(
                "urn:github:url", link,
                ClaimValueTypes.String, context.Options.ClaimsIssuer));
        }
    }
}