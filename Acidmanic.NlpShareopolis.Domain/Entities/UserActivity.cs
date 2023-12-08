using Acidmanic.NlpShareopolis.Domain.Enums;
using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Reflection.Attributes;
using Meadow.DataTypeMapping.Attributes;

namespace Acidmanic.NlpShareopolis.Domain.Entities;

public class UserActivity
{
    
    [UniqueMember]
    [TreatAsLeaf]
    public Id Id { get; set; }
    
    
    public string UserEmail { get; set; }
    
    [TreatAsLeaf]
    public Id ContributionId { get; set; }
    
    public ActivityStatus Status { get; set; }

    public bool IsSeen()
    {
        return Status != ActivityStatus.UnSeen;
    }
}