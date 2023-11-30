using Acidmanic.Utilities.Reflection.Attributes;
using Meadow.RelationalStandardMapping;

namespace Acidmanic.NlpShareopolis.Domain.ValueObjects;

[AlteredType(typeof(string))]
public class LanguageShortName
{
    
    public string Value { get; set; }

    private LanguageShortName()
    {
        
    }

    private LanguageShortName(string value)
    {
        
    }

    public static implicit operator string(LanguageShortName name)
    {
        return name.Value;
    }

    public static implicit operator LanguageShortName(string value)
    {
        return new LanguageShortName(value);
    }
}

public static class LanguageShortnames
{
    public static LanguageShortName Persian => "fa";
    public static LanguageShortName English => "en";
}