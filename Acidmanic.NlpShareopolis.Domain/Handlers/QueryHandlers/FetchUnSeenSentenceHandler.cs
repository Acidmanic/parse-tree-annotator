using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.Queries;
using Acidmanic.NlpShareopolis.Domain.Services.Abstractions;
using Acidmanic.Utilities.Results;
using MediatR;

namespace Acidmanic.NlpShareopolis.Domain.Handlers.QueryHandlers;

public class FetchUnSeenSentenceHandler : IRequestHandler<FetchUnSeenSentenceQuery, Result<SentenceData>>
{

    private readonly ISentenceDomainService _sentenceDomainService;

    public FetchUnSeenSentenceHandler(ISentenceDomainService sentenceDomainService)
    {
        _sentenceDomainService = sentenceDomainService;
    }

    public Task<Result<SentenceData>> Handle(FetchUnSeenSentenceQuery query, CancellationToken cancellationToken)
    {
        var fetched = _sentenceDomainService.FetchSentence(query.Email, query.LanguageShortName);

        return Task.FromResult(fetched);
    }
}