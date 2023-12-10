using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Results;
using MediatR;

namespace Acidmanic.NlpShareopolis.Domain.Queries;

public sealed record DeliverParsedTreeQuery(Id SentenceId,string ParsedTree,LanguageShortName LanguageShortName, string? UserEmail) :IRequest<Result<SentenceTask>>;