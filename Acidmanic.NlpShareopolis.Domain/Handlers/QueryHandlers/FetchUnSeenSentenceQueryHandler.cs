using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.Queries;
using Acidmanic.NlpShareopolis.Domain.Services.Abstractions;
using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Results;
using MediatR;

namespace Acidmanic.NlpShareopolis.Domain.Handlers.QueryHandlers;

public class FetchUnSeenSentenceQueryHandler : IRequestHandler<FetchUnSeenSentenceQuery, Result<SentenceData>>
{
    private readonly ISentenceDataService _sentenceDataService;

    public FetchUnSeenSentenceQueryHandler(ISentenceDataService sentenceDataService)
    {
        _sentenceDataService = sentenceDataService;
    }

    public Task<Result<SentenceData>> Handle(FetchUnSeenSentenceQuery query, CancellationToken cancellationToken)
    {
        var foundSentence = _sentenceDataService.ReadUnSeenSentenceData(
            query.Email ?? "", query.Language);

        return Task.FromResult(foundSentence);
    }
}