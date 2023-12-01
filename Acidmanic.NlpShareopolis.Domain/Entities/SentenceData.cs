using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Reflection.Attributes;
using Meadow.DataTypeMapping.Attributes;

namespace Acidmanic.NlpShareopolis.Domain.Entities;

public class SentenceData
{
    [UniqueMember]
    public Guid Id { get; set; }
    
    [ForceColumnSize(1024)]
    public string Text { get; set; }
    
    [TreatAsLeaf]
    public LanguageShortName LanguageShortName { get; set; }
    
}