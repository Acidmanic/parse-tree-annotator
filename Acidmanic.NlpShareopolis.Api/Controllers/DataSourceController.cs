using Acidmanic.NlpShareopolis.Api.Dtos;
using Acidmanic.NlpShareopolis.Api.Services;
using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.Exceptions;
using Acidmanic.NlpShareopolis.Domain.Queries;
using Acidmanic.Utilities.Results;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Acidmanic.NlpShareopolis.Api.Controllers;

[ApiController]
[Route("api/data-source")]
public class DataSourceController : NlpShareopolisControllerBase
{

    private readonly SentenceDataMapper _sentenceDataMapper;
    
    public DataSourceController(IMediator mediator, SentenceDataMapper sentenceDataMapper) : base(mediator)
    {
        _sentenceDataMapper = sentenceDataMapper;
    }


    private Result<SentenceDataDto> Map(Result<SentenceTask> value)
    {
        if (value)
        {
            return new Result<SentenceDataDto>(true, _sentenceDataMapper.Map(value.Value));
        }

        return new Result<SentenceDataDto>().FailAndDefaultValue();
    }

    [HttpGet]
    [Route("fetch-sentence/{languageName}")]
    public async Task<IActionResult> FetchSentence(string languageName)
    {
        var email = UserEmail();

        var query = new FetchUnSeenSentenceQuery(languageName, email);

        return await Query(query, Map);
    }

    [HttpPut]
    [Route("skip-sentence/{sentenceId}")]
    public async Task<IActionResult> SkipSentence(string sentenceId)
    {
        var email = UserEmail();

        var query = new SkipSentenceQuery(sentenceId, email);

        return await Query(query, Map);
    }

    [HttpPost]
    [Route("deliver-parsed-tree")]
    public async Task<IActionResult> DeliverParsedTree(ParsedSentenceDto parsedSentence)
    {
        var email = UserEmail();

        var query = new DeliverParsedTreeQuery(parsedSentence.SentenceId, 
            parsedSentence.ParsedTree,parsedSentence.LanguageShortName, email,
            parsedSentence.HardProgress,parsedSentence.SoftProgress);

        return await Query(query, Map);
    }

    [HttpGet]
    [Route("available-languages")]
    public async Task<IActionResult> AvailableLanguages()
    {
        var query = new AvailableSentenceTaskLanguagesQuery();

        return await Query(query);
    }
}