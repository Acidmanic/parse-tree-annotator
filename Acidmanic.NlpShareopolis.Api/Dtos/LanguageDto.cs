using Acidmanic.NlpShareopolis.Domain.ValueObjects;

namespace Acidmanic.NlpShareopolis.Api.Dtos;

public class LanguageDto
{
    public string ShortName { get; set; }
    
    public string Name { get; set; }
    
    public string Direction { get; set; }

    public static implicit operator Language(LanguageDto value)
    {
        return value.ShortName;
    }
    
    public static implicit operator LanguageDto(Language value)
    {
        return new LanguageDto
        {
            Direction = value.Direction,
            Name = value.Name,
            ShortName = value.ShortName
        };
    }
}