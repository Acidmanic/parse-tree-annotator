using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Reflection.Attributes;

namespace Acidmanic.NlpShareopolis.Domain.Data.Requests.Models;

public class LanguageShell
{
    
    [UniqueMember]
    public Id Id { get; set; }
    
    [TreatAsLeaf]
    public Language Language { get; set; }
}