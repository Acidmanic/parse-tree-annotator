using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Results;

namespace Acidmanic.NlpShareopolis.Domain.Services.Abstractions;

public interface ISentenceDomainService
{
    Result<SentenceData> FetchSentence(string? userEmail, LanguageShortName languageShortname);

    Result<SentenceData> SkipSentence(Id activityId);
}