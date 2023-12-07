using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Results;

namespace Acidmanic.NlpShareopolis.Domain.Services.Abstractions;

public interface ISentenceDataService
{
    public Result<SentenceData> FetchFirstUnSeenSentenceData(string userEmail,LanguageShortName languageShortName);
}