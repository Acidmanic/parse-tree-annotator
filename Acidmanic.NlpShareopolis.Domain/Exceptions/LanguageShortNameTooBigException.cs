namespace Acidmanic.NlpShareopolis.Domain.Exceptions;

public class LanguageShortNameTooBigException:DomainExceptionBase
{
    public LanguageShortNameTooBigException() : 
        base("ef2e1630-94e9-11ee-8343-5765e80f78af", "Language short name can not be larger than 4 characters.")
    {
        
    }
}