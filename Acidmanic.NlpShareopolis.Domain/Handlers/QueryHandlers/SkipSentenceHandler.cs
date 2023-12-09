using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.Queries;
using Acidmanic.NlpShareopolis.Domain.Services.Abstractions;
using Acidmanic.Utilities.Results;
using MediatR;

namespace Acidmanic.NlpShareopolis.Domain.Handlers.QueryHandlers;

public class SkipSentenceHandler:IRequestHandler<SkipSentenceQuery,Result<SentenceData>>
{
    private readonly ISentenceDomainService _sentenceDomainService;

    public SkipSentenceHandler(ISentenceDomainService sentenceDomainService)
    {
        _sentenceDomainService = sentenceDomainService;
    }

    public Task<Result<SentenceData>> Handle(SkipSentenceQuery request, CancellationToken cancellationToken)
    {
        var fetched = _sentenceDomainService.SkipSentence(request.ActivityId);
        
        return Task.FromResult(fetched);
    }

    
}