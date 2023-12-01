using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.Queries;
using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using MediatR;

namespace Acidmanic.NlpShareopolis.Domain.Handlers.QueryHandlers;

public class FetchUnSeenSentenceQueryHandler : IRequestHandler<FetchUnSeenSentenceQuery, SentenceData>
{
    public Task<SentenceData> Handle(FetchUnSeenSentenceQuery query, CancellationToken cancellationToken)
    {
        //TODO: Real implementation

        return Task.FromResult(new SentenceData
        {
            Id = new Guid(),
            Text = "This is a book",
            LanguageShortName = LanguageShortnames.English
        });
    }
}