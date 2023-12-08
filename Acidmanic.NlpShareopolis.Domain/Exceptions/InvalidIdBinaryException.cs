namespace Acidmanic.NlpShareopolis.Domain.Exceptions;

public class InvalidIdBinaryException:DomainExceptionBase
{
    public InvalidIdBinaryException():
        base("0b393d6e-95b2-11ee-8ff4-876024ee9f7f", "Entered byte array is not correct values for an id.")
    {
    }
}