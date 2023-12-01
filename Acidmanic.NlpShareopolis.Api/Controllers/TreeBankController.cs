using Acidmanic.NlpShareopolis.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Acidmanic.NlpShareopolis.Api.Controllers;

[ApiController]
[Route("api/tree-bank")]
public class TreeBankController : ControllerBase
{
    private static readonly string PostagModelFileNamePostFix = "-tags.json";

    [HttpGet]
    [Route("pos-tags/{modelName}")]
    public IActionResult GetPostagModelByName(string modelName)
    {
        var fileName = Path.Combine("Resources", "Models", $"{modelName}{PostagModelFileNamePostFix}");

        if (!System.IO.File.Exists(fileName))
        {
            return NotFound();
        }

        var json = System.IO.File.ReadAllText(fileName);

        var bank = JsonConvert.DeserializeObject<PosTagBank>(json);

        return Ok(bank);
    }

    [HttpGet]
    [Route("pos-tags")]
    public IActionResult GetAllPostagModelNames()
    {
        var directoryPath = Path.Combine("Resources", "Models");

        var directory = new DirectoryInfo(directoryPath);

        var files = directory.GetFiles();

        var modelsAvailable = new List<string>();

        foreach (var file in files)
        {
            var fileName = file.Name;

            if (fileName.ToLower().EndsWith(PostagModelFileNamePostFix.ToLower()))
            {
                var modelName = fileName.Substring(0, fileName.Length - PostagModelFileNamePostFix.Length);

                modelsAvailable.Add(modelName);
            }
        }

        return Ok(new { Items = modelsAvailable });
    }
}