using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Results;
using EnTier.Services;

namespace Acidmanic.NlpShareopolis.Domain.Services.Abstractions;

public interface ISentenceDataService:ICrudService<SentenceData,Id>
{
    public Result<SentenceData> FetchFirstUnSeenSentenceData(string userEmail,LanguageShortName languageShortName);
}