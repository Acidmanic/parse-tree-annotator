using Acidmanic.NlpShareopolis.Api.Models;
using Acidmanic.NlpShareopolis.Api.Utilities;
using Acidmanic.Utilities.Web.Extensions;
using Microsoft.AspNetCore.Authentication;

namespace Acidmanic.NlpShareopolis.Api.Extensions;

public static class AuthenticationBuilderExternalLoginConfigurator
{



    public static AuthenticationBuilder AddGithub(this AuthenticationBuilder builder)
    {
        var secrets = PropertyFile.ReadAllProperties("secrets");

        var clientId = secrets["github_client_id"];
        var clientSecret = secrets["github_client_secret"];

        return builder.AddGithub(clientId, clientSecret, AuthenticationConstants.DefaultScheme);
    }
    
    public static AuthenticationBuilder AddLinkedIn(this AuthenticationBuilder builder)
    {
        var secrets = PropertyFile.ReadAllProperties("secrets");

        var clientId = secrets["linkedin_client_id"];
        var clientSecret = secrets["linkedin_client_secret"];

        return builder.AddLinkedIn(clientId, clientSecret,AuthenticationConstants.DefaultScheme);
    }
    
    
    
}