using Acidmanic.ParseTreeAnnotator.Web.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Acidmanic.ParseTreeAnnotator.Web.Controllers;


[ApiController]
[Route("tree-bank")]
public class PennTreeBankController:ControllerBase
{


    [HttpGet]
    [Route("pos-tags/{modelName}")]
    public IActionResult GetAllPostags(string modelName)
    {
        var json = System.IO.File.ReadAllText(Path.Combine("Resources", "Models", $"{modelName}-tags.json"));

        var bank = JsonConvert.DeserializeObject<PosTagBank>(json);
        
        return Ok(bank);
    }
}