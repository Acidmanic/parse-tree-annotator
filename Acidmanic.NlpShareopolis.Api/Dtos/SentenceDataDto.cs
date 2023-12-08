using Acidmanic.NlpShareopolis.Domain.Entities;

namespace Acidmanic.NlpShareopolis.Api.Dtos;

public class SentenceDataDto 
{
    public Guid Id { get; set; }

    public string LanguageShortName { get; set; }

    public string Text { get; set; }


    public static SentenceDataDto Map(SentenceData value)
    {
        return new SentenceDataDto
        {
            Id = value.Id,
            LanguageShortName = value.LanguageShortName,
            Text = value.Text
        };
    }

    public static SentenceData Map(SentenceDataDto value)
    {
        return new SentenceData
        {
            Id = value.Id,
            LanguageShortName = value.LanguageShortName,
            Text = value.Text
        };
    }
}