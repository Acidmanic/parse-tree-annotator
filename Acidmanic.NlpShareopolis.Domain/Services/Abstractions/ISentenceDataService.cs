using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.Utilities.Results;

namespace Acidmanic.NlpShareopolis.Domain.Services.Abstractions;

public interface ISentenceDataService
{
    public Result<SentenceData> ReadUnSeenSentenceData(Guid sentenceId,string userEmail,string languageShortName);
}