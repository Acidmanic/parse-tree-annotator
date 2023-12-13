using Acidmanic.NlpShareopolis.Domain.Exceptions;
using Acidmanic.Utilities.Reflection.Attributes;
using Meadow.RelationalStandardMapping;

namespace Acidmanic.NlpShareopolis.Domain.ValueObjects;

[AlteredType(typeof(string))]
public class Language
{
    private static readonly Dictionary<string, string> NamesByShortName = new()
    {
        {"fa","فارسی"},
        {"en","English"}
    };
    private static readonly Dictionary<string, string> DirectionsByShortName = new()
    {
        {"fa","rtl"},
        {"en","ltr"}
    };
    public string ShortName { get; }
    

    private Language(string shortName)
    {
        if (string.IsNullOrEmpty(shortName))
        {
            throw new LanguageShortNameCannotBeEmptyException();
        }

        if (shortName.Length > 4)
        {
            throw new LanguageShortNameTooBigException();
        }
        ShortName = shortName;
    }

    public static implicit operator string(Language name)
    {
        return name.ShortName;
    }

    public static implicit operator Language(string value)
    {
        return new Language(value);
    }

    public string Name
    {
        get
        {
            if (NamesByShortName.ContainsKey(ShortName))
            {
                return NamesByShortName[ShortName];
            }

            return "UnKnown";
        }
        set { }
    }
    public string Direction
    {
        get
        {
            if (DirectionsByShortName.ContainsKey(ShortName))
            {
                return DirectionsByShortName[ShortName];
            }

            return "ltr";
        }
        set { }
    }
}

public static class LanguageShortnames
{
    public static Language Persian => "fa";
    public static Language English => "en";
}