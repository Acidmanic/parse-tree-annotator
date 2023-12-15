using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using MediatR;

namespace Acidmanic.NlpShareopolis.Domain.Queries;

public sealed record AvailableSentenceTaskLanguagesQuery:IRequest<IEnumerable<Language>>;