using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.Queries;
using Acidmanic.NlpShareopolis.Domain.Services.Abstractions;
using Acidmanic.Utilities.Results;
using MediatR;

namespace Acidmanic.NlpShareopolis.Domain.Handlers.QueryHandlers;

public class SkipSentenceHandler:IRequestHandler<SkipSentenceQuery,Result<SentenceTask>>
{
    private readonly ISentenceDomainService _sentenceDomainService;

    public SkipSentenceHandler(ISentenceDomainService sentenceDomainService)
    {
        _sentenceDomainService = sentenceDomainService;
    }

    public Task<Result<SentenceTask>> Handle(SkipSentenceQuery request, CancellationToken cancellationToken)
    {
        var fetched = _sentenceDomainService.SkipFetchSentence(request.SentenceId,request.UserEmail);
        
        return Task.FromResult(fetched);
    }

    
}