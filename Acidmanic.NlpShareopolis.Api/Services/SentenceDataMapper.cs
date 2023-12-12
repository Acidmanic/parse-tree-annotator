using Acidmanic.NlpShareopolis.Api.Dtos;
using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.Services.Abstractions;

namespace Acidmanic.NlpShareopolis.Api.Services;

public class SentenceDataMapper
{

    private readonly IExpressionTokenizer _expressionTokenizer;

    public SentenceDataMapper(IExpressionTokenizer expressionTokenizer)
    {
        _expressionTokenizer = expressionTokenizer;
    }


    public SentenceDataDto Map(SentenceTask value)
    {
        return new SentenceDataDto
        {
            Id = value.Id,
            LanguageShortName = value.LanguageShortName,
            Tokens = _expressionTokenizer.Tokenize(value.Text)
        };
    }

    public  SentenceTask Map(SentenceDataDto value)
    {
        return new SentenceTask
        {
            Id = value.Id,
            LanguageShortName = value.LanguageShortName,
            Text = string.Join(' ',value.Tokens)
        };
    }
}