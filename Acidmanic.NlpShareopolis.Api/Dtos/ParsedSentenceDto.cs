namespace Acidmanic.NlpShareopolis.Api.Dtos;

public class ParsedSentenceDto
{
    public string SentenceId { get; set; }
    
    public string ParsedTree { get; set; }
    
    public string LanguageShortName { get; set; }
    
    public double HardProgress { get; set; }
    
    public double SoftProgress { get; set; }
    
}