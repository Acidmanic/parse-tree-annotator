using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Results;
using EnTier.Prepopulation;
using EnTier.Prepopulation.Attributes;
using EnTier.Prepopulation.Contracts;

namespace Acidmanic.NlpShareopolis.Domain.Data.Seeds.DevelopmentSeeds;

public class SentenceDataSeeder:SeedBase<SentenceData>
{
    

    public override string SeedName => "Development Sentence Data";


    public override IEnumerable<SentenceData> SeedingObjects { get; } = new List<SentenceData>()
    {
        new()
        {
            Id = Guid.NewGuid(),
            Text = "This is a book",
            LanguageShortName = LanguageShortnames.English
        },
        new()
        {
            Id = Guid.Empty,
            Text = "This is going to be very long sentence",
            LanguageShortName = LanguageShortnames.English
        },
    };
}