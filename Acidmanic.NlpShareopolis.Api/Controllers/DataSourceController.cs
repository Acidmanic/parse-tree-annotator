using Acidmanic.NlpShareopolis.Domain.Exceptions;
using Acidmanic.NlpShareopolis.Domain.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Acidmanic.NlpShareopolis.Api.Controllers;

[ApiController]
[Route("api/data-source")]
public class DataSourceController:NlpShareopolisControllerBase
{
    
    public DataSourceController(IMediator mediator) : base(mediator)
    {
    }
    

    [HttpGet]
    [Route("fetch-sentence/{languageName}")]
    public async Task<IActionResult> FetchSentence(string languageName)
    {
        var email = UserEmail();

        var query = new FetchUnSeenSentenceQuery(languageName, email);

        return await Query(query);
    }

    
}