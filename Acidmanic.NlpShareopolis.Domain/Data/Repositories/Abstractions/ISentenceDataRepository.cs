using Acidmanic.NlpShareopolis.Domain.Data.Requests;
using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.Utilities.Results;
using EnTier.Repositories;
using Org.BouncyCastle.Crypto.Engines;

namespace Acidmanic.NlpShareopolis.Domain.Data.Repositories.Abstractions;

public interface ISentenceDataRepository:ICrudRepository<SentenceData,Guid>
{

    Result<SentenceData> ReadFirstUnSeenSentence(Guid activityId, string userEmail);
}