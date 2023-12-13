using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Results;
using EnTier.Services;

namespace Acidmanic.NlpShareopolis.Domain.Services.Abstractions;

public interface ISentenceDataService:ICrudService<SentenceTask,Id>
{
    public Result<SentenceTask> FetchFirstUnSeenSentenceData(string userEmail,Language language);
}