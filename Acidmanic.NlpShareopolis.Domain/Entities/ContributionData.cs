using Acidmanic.Utilities.Reflection.Attributes;

namespace Acidmanic.NlpShareopolis.Domain.Entities;

public abstract class ContributionData
{
    [UniqueMember] public Guid Id { get; set; }

    public abstract Guid ContributionId();
}