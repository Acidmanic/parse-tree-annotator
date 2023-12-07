using Acidmanic.NlpShareopolis.Domain.Exceptions;
using Acidmanic.Utilities.Reflection.Attributes;

namespace Acidmanic.NlpShareopolis.Domain.ValueObjects;

[AlteredType(typeof(string))]
public class LanguageShortName
{
    
    public string Value { get; }
    

    private LanguageShortName(string value)
    {
        if (string.IsNullOrEmpty(value))
        {
            throw new LanguageShortNameCannotBeEmptyException();
        }

        if (value.Length > 4)
        {
            throw new LanguageShortNameTooBigException();
        }
        Value = value;
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