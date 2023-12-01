using Acidmanic.NlpShareopolis.Domain.Enums;
using Acidmanic.Utilities.Reflection.Attributes;

namespace Acidmanic.NlpShareopolis.Domain.Entities;

public class UserActivity
{
    
    [UniqueMember]
    public Guid Id { get; set; }
    
    
    public string UserEmail { get; set; }
    
    public Guid ContributionId { get; set; }
    
    public ActivityStatus Status { get; set; }

    public bool IsSeen()
    {
        return Status != ActivityStatus.UnSeen;
    }
}