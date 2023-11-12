using System.Reflection.Metadata.Ecma335;
using Acidmanic.ParseTreeAnnotator.Web.Abstractions;
using Acidmanic.ParseTreeAnnotator.Web.Models;
using Acidmanic.Utilities.Results;
using Newtonsoft.Json;

namespace Acidmanic.ParseTreeAnnotator.Web.Services;

public class BackChannelLoginService:IGithubLoginService
{

    public static readonly string GithubExchangeUrl = "https://github.com/login/oauth/access_token";
    
    
    
    public async Task<Result<GithubAccessToken>> ExchangeCode(string code)
    {
        var url = GithubExchangeUrl + 
                  $"?code={code}&client_id=f52235de4632fa707792&client_secret=864cc783b782ddbc2d354133e4d44bc0cacf43cd";

        var request = new HttpRequestMessage(HttpMethod.Post, url);

        request.Headers.Add("accept","application/json");
        
        var httpClient = new HttpClient();

        var response = await httpClient.SendAsync(request);

        if (response.IsSuccessStatusCode)
        {
            var json = await response.Content.ReadAsStringAsync();

            var token = ConvertOrDefault<GithubAccessToken>(json);

            if (token != null)
            {
                return new Result<GithubAccessToken>(true, token);
            }
        }

        return new Result<GithubAccessToken>().FailAndDefaultValue();
    }

    private T? ConvertOrDefault<T>(string json)
    {
        try
        {
            return JsonConvert.DeserializeObject<T>(json);
        }
        catch (Exception _) { /*    ignore      */ }

        return default;
    }
}