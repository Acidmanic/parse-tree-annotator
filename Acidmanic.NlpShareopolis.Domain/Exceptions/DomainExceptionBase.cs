namespace Acidmanic.NlpShareopolis.Domain.Exceptions;

public class DomainExceptionBase:Exception
{
    public Guid UniqueId { get; }
    
    public DomainExceptionBase(string guid,string message):base(message)
    {
        UniqueId = Guid.Parse(guid);
    }
}