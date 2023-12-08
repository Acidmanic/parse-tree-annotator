using Acidmanic.NlpShareopolis.Domain.Exceptions;
using Acidmanic.Utilities.Reflection.Attributes;

namespace Acidmanic.NlpShareopolis.Domain.ValueObjects;

[AlteredType(typeof(string))]
public class Id
{
    public Id(Guid value)
    {
        Value = value;
    }

    public Id(string stringGuid)
    {
        try
        {
            Value = Guid.Parse(stringGuid);
        }
        catch (Exception e)
        {
            throw new InvalidIdStringException();
        }
    }

    public Id(byte[] binary)
    {
        try
        {
            Value = new Guid(binary);
        }
        catch (Exception e)
        {
            throw new InvalidIdBinaryException();
        }
    }

    private Guid Value { get;  }



    public static implicit operator Guid(Id id)
    {
        return id.Value;
    }

    public static implicit operator Id(Guid id)
    {
        return new Id(id);
    }

    public static implicit operator string(Id id)
    {
        return id.Value.ToString();
    }

    public static implicit operator Id(string id)
    {
        return new Id(id);
    }

    public static implicit operator byte[](Id id)
    {
        return id.Value.ToByteArray();
    }

    public static implicit operator Id(byte[] id)
    {
        return new Id(id);
    }

    public static bool operator ==(Id i1, Id i2)
    {
        return i1.Value == i2.Value;
    }

    public static bool operator !=(Id i1, Id i2)
    {
        return i1.Value != i2.Value;
    }
    
    public static bool operator >(Id i1, Id i2)
    {
        return i1.Value > i2.Value;
    }

    public static bool operator <(Id i1, Id i2)
    {
        return i1.Value < i2.Value;
    }
    
    public static bool operator >=(Id i1, Id i2)
    {
        return i1.Value >= i2.Value;
    }

    public static bool operator <=(Id i1, Id i2)
    {
        return i1.Value <= i2.Value;
    }

    public override bool Equals(object? obj)
    {
        if (obj is Id id)
        {
            return id.Value == Value;
        }

        return false;
    }

    public override string ToString()
    {
        return Value.ToString().ToLower();
    }

    public override int GetHashCode()
    {
        return Value.GetHashCode();
    }
}