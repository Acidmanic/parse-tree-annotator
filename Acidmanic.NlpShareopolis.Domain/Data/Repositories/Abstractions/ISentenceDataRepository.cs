using Acidmanic.NlpShareopolis.Domain.Data.Requests;
using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Results;
using EnTier.Repositories;
using Org.BouncyCastle.Crypto.Engines;

namespace Acidmanic.NlpShareopolis.Domain.Data.Repositories.Abstractions;

public interface ISentenceDataRepository:ICrudRepository<SentenceTask,Guid>
{

    Result<SentenceTask> ReadFirstUnSeenSentence(string userEmail,string languageShortName);

    IEnumerable<Language> ReadAvailableLanguages();
}