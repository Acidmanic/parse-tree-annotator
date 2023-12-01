using Acidmanic.NlpShareopolis.Domain.Entities;
using MediatR;


namespace Acidmanic.NlpShareopolis.Domain.Queries;

public sealed record FetchUnSeenSentenceQuery(string Language, string? Email)
    : IRequest<SentenceData>;
