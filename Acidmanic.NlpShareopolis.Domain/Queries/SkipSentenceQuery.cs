using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Results;
using MediatR;

namespace Acidmanic.NlpShareopolis.Domain.Queries;

public sealed record SkipSentenceQuery(Id SentenceId, string? UserEmail):IRequest<Result<SentenceData>>;