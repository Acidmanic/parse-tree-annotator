using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace Acidmanic.ParseTreeAnnotator.Web.Models;

public class GithubAccessToken
{
    
    [JsonProperty("access_token")]
    [JsonPropertyName("access_token")]
    public string AccessToken { get; set; }
    
    public string Scope { get; set; }
    
    [JsonProperty("token_type")]
    [JsonPropertyName("token_type")]
    public string TokenType { get; set; }
}