using Acidmanic.ParseTreeAnnotator.Web.Abstractions;
using Microsoft.AspNetCore.Mvc;

namespace Acidmanic.ParseTreeAnnotator.Web.Controllers;



[ApiController]
[Route("api/accounts")]
public class AccountsController:ControllerBase
{


    private readonly IGithubLoginService _githubLoginService;

    public AccountsController(IGithubLoginService githubLoginService)
    {
        _githubLoginService = githubLoginService;
    }

    [HttpPost]
    [Route("github/exchange/{code}")]
    public async Task<IActionResult> ExchangeCodeWithToken(string code)
    {
        var response = await _githubLoginService.ExchangeCode(code);

        if (response.Success)
        {
            return Ok(response.Value);
        }

        return Unauthorized();
    }
    
    
}