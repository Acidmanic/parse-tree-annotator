using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Reflection.Attributes;
using Meadow.DataTypeMapping.Attributes;

namespace Acidmanic.NlpShareopolis.Domain.Entities;

public class SentenceData:ContributionData
{
    
    
    [ForceColumnSize(1024)]
    public string Text { get; set; }
    
    [TreatAsLeaf]
    [ForceColumnSize(4)]
    public LanguageShortName LanguageShortName { get; set; }

    public override Guid ContributionId()=> Guid.Parse("f65973fe-907b-11ee-ae96-2f4d3c25cf4c");
}