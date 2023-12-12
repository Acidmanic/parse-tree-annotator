using Acidmanic.NlpShareopolis.Domain.Entities;

namespace Acidmanic.NlpShareopolis.Api.Dtos;

public class SentenceDataDto 
{
    public Guid Id { get; set; }

    public string LanguageShortName { get; set; }

    public string[] Tokens { get; set; }


    
}