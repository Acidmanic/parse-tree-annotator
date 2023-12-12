using Acidmanic.NlpShareopolis.Domain.Services.Abstractions;

namespace Acidmanic.NlpShareopolis.Domain.Services.Implementations;

public class SimpleExpressionTokenizer:IExpressionTokenizer
{
    public string[] Tokenize(string expression)
    {

        var tokens = expression.Split(new string[] 
                    { " ", "\t", "\r","\n",",",".","!","","(",")","،" }, 
                StringSplitOptions.RemoveEmptyEntries)
            .Select(t => t.ToLower())
            .ToArray();

        return tokens;
    }
}