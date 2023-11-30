using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Acidmanic.ParseTreeAnnotator.Web.Controllers;

[ApiController]
[Route("api/data-source")]
public class DataSourceController:ControllerBase
{


    [HttpGet]
    [Route("fetch-sentence/{languageName}")]
    public IActionResult FetchSentence(string languageName)
    {

        // find user
        // find sentence with language unseen by user


        return Ok(new {sentence="this is a book"});
    }
}