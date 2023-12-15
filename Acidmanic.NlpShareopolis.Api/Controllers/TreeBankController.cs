using Acidmanic.NlpShareopolis.Api.Dtos;
using Acidmanic.NlpShareopolis.Api.Models;
using Acidmanic.NlpShareopolis.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Acidmanic.NlpShareopolis.Api.Controllers;

[ApiController]
[Route("api/tree-bank")]
public class TreeBankController : ControllerBase
{
    private readonly TreeBankService _treeBankService;

    public TreeBankController(TreeBankService treeBankService)
    {
        _treeBankService = treeBankService;
    }

    [HttpGet]
    [Route("pos-tags-by-model/{modelName}")]
    public IActionResult GetPostagModelByName(string modelName)
    {

        var bankFound = _treeBankService.ReadTreeBankByModelName(modelName);

        if (bankFound)
        {
            return Ok(bankFound.Value);
        }

        return NotFound();
    }
    
    [HttpGet]
    [Route("pos-tags-by-language/{languageShortName}")]
    public IActionResult GetPosTagsForLanguage(string languageShortName)
    {
        var bankFound = _treeBankService.GetBankByLanguage(languageShortName);

        if (bankFound)
        {
            return Ok(bankFound.Value);
        }

        return NotFound();
    }

    [HttpGet]
    [Route("pos-tags")]
    public IActionResult GetAllPostagModelNames()
    {

        var modelsAvailable = _treeBankService.GetAvailableModels();

        return Ok(new { Items = modelsAvailable });
    }
}