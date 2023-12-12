using System.Runtime.CompilerServices;

namespace Acidmanic.NlpShareopolis.Domain.Services.Abstractions;

public interface IExpressionTokenizer
{
    string[] Tokenize(string expression);
}