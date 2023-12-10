using Acidmanic.NlpShareopolis.Domain.Data.Repositories.Abstractions;
using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.Services.Abstractions;
using Acidmanic.NlpShareopolis.Domain.Shared;
using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Results;
using EnTier;

namespace Acidmanic.NlpShareopolis.Domain.Services.Implementations;

public class SentenceDataCrudService:CrudService<SentenceTask>, ISentenceDataService
{
    public SentenceDataCrudService(EnTierEssence essence) : base(essence)
    {
    }

    public Result<SentenceTask> FetchFirstUnSeenSentenceData( string userEmail,LanguageShortName languageShortName)
    {
        if (UnitOfWork.GetCrudRepository<SentenceTask, Guid>() is ISentenceDataRepository repository)
        {
            return repository.ReadFirstUnSeenSentence(userEmail,languageShortName);
        }

        return new Result<SentenceTask>().FailAndDefaultValue();
    }
}