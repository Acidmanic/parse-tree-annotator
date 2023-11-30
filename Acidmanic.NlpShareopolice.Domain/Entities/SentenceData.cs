using Acidmanic.NlpShareopolice.Domain.ValueObjects;
using Acidmanic.Utilities.Reflection.Attributes;
using Meadow.DataTypeMapping.Attributes;

namespace Acidmanic.NlpShareopolice.Domain.Entities;

public class SentenceData
{
    [UniqueMember]
    public Guid Id { get; set; }
    
    [ForceColumnSize(1024)]
    public string Text { get; set; }
    
    public LanguageShortName LanguageShortName { get; set; }
    
}