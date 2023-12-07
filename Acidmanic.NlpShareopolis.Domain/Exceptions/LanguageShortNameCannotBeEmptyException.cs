namespace Acidmanic.NlpShareopolis.Domain.Exceptions;

public class LanguageShortNameCannotBeEmptyException:DomainExceptionBase
{
    public LanguageShortNameCannotBeEmptyException() : 
        base("08eadfa4-94ea-11ee-9ce8-77045288f829", 
            "Language short name can not be empty.")
    {
        
    }
}