using Acidmanic.ParseTreeAnnotator.Web.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Acidmanic.ParseTreeAnnotator.Web.Controllers;


[ApiController]
[Route("penn")]
public class PennTreeBankController:ControllerBase
{


    [HttpGet]
    [Route("pos-tags")]
    public IActionResult GetAllPostags()
    {
        var json = System.IO.File.ReadAllText(Path.Combine("Resources", "Models", "penntree-tags.json"));

        var bank = JsonConvert.DeserializeObject<PosTagBank>(json);
        
        return Ok(bank);
    }
}