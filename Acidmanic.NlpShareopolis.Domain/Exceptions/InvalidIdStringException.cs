namespace Acidmanic.NlpShareopolis.Domain.Exceptions;

public class InvalidIdStringException:DomainExceptionBase
{
    public InvalidIdStringException():
        base("c8a00834-95b1-11ee-8b8f-23dab5d04898", "Entered string is not correct string for an id.")
    {
    }
}