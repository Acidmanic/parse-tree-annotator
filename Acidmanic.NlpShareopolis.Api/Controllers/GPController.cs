using Acidmanic.NlpShareopolis.Domain.Entities;
using EnTier;
using EnTier.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Acidmanic.NlpShareopolis.Api.Controllers;



[ApiController]
[Route("api/sentence-data")]
public class GpController:CrudControllerBase<SentenceData,Guid>
{




    [HttpGet]
    [Route("hello")]
    [Authorize]
    public IActionResult Hello()
    {
        return Ok(new { Message = "Hello" });
    }

    public GpController(EnTierEssence essence) : base(essence)
    {
    }
}