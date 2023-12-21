namespace Acidmanic.NlpShareopolis.Api.Dtos;

public class SentenceDataDto 
{
    public Guid Id { get; set; }

    public LanguageDto Language { get; set; }

    public string[] Tokens { get; set; }
    
    public double Credit { get; set; }
    
}