using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.Utilities.Results;
using MediatR;


namespace Acidmanic.NlpShareopolis.Domain.Queries;

public sealed record FetchUnSeenSentenceQuery(string LanguageShortName, string? Email) : IRequest<Result<SentenceTask>>;
