using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Reflection.Attributes;

namespace Acidmanic.NlpShareopolis.Domain.Entities;

public abstract class ContributionWork
{
    [TreatAsLeaf]
    [UniqueMember] public Id Id { get; set; }

    public Id ContributionId { get; set; }
    
    public string UserEmail { get; set; }
}