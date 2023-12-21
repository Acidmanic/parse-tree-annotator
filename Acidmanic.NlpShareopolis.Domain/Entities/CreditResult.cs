using Acidmanic.Utilities.Reflection.Extensions;
using Acidmanic.Utilities.Results;

namespace Acidmanic.NlpShareopolis.Domain.Entities;

public class CreditResult<T>:Result<T>
{
    
    
    public double Credit { get; set; }

    public CreditResult():this(false,default,0)
    {
    }

    public CreditResult(bool success, T value) : this(success,value,0)
    {
    }
    
    public CreditResult(bool success, T value, double credit) : base(success, value)
    {
        Credit = credit;
    }

    public CreditResult<T> Failure(double credit =0)
    {
        return new CreditResult<T>
        {
            Credit = credit,
            Success = false,
            Value = default
        };
    }
}

public static  class ResultOfTCreditResultConversionExtensions{


    public static CreditResult<T> ToCreditResult<T>(this Result<T> result,double credit =0)
    {
        return new CreditResult<T>(result.Success, result.Value, credit);
    }
}