using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Reflection.Attributes;

namespace Acidmanic.NlpShareopolis.Domain.Entities;

public abstract class ContributionData
{
    [TreatAsLeaf]
    [UniqueMember] public Id Id { get; set; }

    public abstract Id ContributionId();
}