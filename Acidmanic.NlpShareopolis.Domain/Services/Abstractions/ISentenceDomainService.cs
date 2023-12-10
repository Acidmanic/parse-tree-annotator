using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Results;

namespace Acidmanic.NlpShareopolis.Domain.Services.Abstractions;

public interface ISentenceDomainService
{
    Result<SentenceTask> FetchSentence(string? userEmail, LanguageShortName languageShortname);

    Result<SentenceTask> SkipFetchSentence(Id activityId, string? userEmail);
    
    Result<SentenceTask> DeliverFetchSentence(Id activityId, string? userEmail);
}