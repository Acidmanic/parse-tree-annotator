using Acidmanic.NlpShareopolis.Domain.Entities;

namespace Acidmanic.NlpShareopolis.Api.Dtos;

public class SentenceDataDto 
{
    public Guid Id { get; set; }

    public string LanguageShortName { get; set; }

    public string Text { get; set; }


    public static SentenceDataDto Map(SentenceTask value)
    {
        return new SentenceDataDto
        {
            Id = value.Id,
            LanguageShortName = value.LanguageShortName,
            Text = value.Text
        };
    }

    public static SentenceTask Map(SentenceDataDto value)
    {
        return new SentenceTask
        {
            Id = value.Id,
            LanguageShortName = value.LanguageShortName,
            Text = value.Text
        };
    }
}