using Acidmanic.ParseTreeAnnotator.Web.Models;
using Acidmanic.Utilities.Results;

namespace Acidmanic.ParseTreeAnnotator.Web.Abstractions;

public interface IGithubLoginService
{




    Task<Result<GithubAccessToken>> ExchangeCode(string code);
}