using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Results;
using MediatR;

namespace Acidmanic.NlpShareopolis.Domain.Queries;

public sealed record DeliverParsedTreeQuery(Id SentenceId,string ParsedTree,Language Language, string? UserEmail,double HardProgress,double SoftProgress) :IRequest<Result<SentenceTask>>;