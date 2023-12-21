using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Reflection.Attributes;
using Meadow.DataTypeMapping.Attributes;

namespace Acidmanic.NlpShareopolis.Domain.Entities;

public class SentenceTask:ContributionData
{

    [ForceColumnSize(1024)]
    public string Text { get; set; }
    
    [TreatAsLeaf]
    [ForceColumnSize(4)]
    public Language Language { get; set; }

    public override Id ContributionId()=> "f65973fe-907b-11ee-ae96-2f4d3c25cf4c";

    protected override double GetCredit() => 100 + (string.IsNullOrEmpty(Text) ? 0 : Text.Length / 100);
}