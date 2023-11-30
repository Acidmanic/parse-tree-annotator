using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Acidmanic.NlpShareopolice.Api.Controllers;



[ApiController]
[Route("api/gp")]
public class GpController:ControllerBase
{




    [HttpGet]
    [Route("hello")]
    [Authorize]
    public IActionResult Hello()
    {
        return Ok(new { Message = "Hello" });
    }
}