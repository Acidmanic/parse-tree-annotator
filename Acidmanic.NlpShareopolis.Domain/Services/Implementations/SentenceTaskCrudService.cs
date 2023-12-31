using Acidmanic.NlpShareopolis.Domain.Data.Repositories.Abstractions;
using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.Services.Abstractions;
using Acidmanic.NlpShareopolis.Domain.Shared;
using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Results;
using EnTier;

namespace Acidmanic.NlpShareopolis.Domain.Services.Implementations;

public class SentenceTaskCrudService:CrudService<SentenceTask>, ISentenceCrudService
{
    public SentenceTaskCrudService(EnTierEssence essence) : base(essence)
    {
    }

    public Result<SentenceTask> FetchFirstUnSeenSentenceData( string userEmail,Language language)
    {
        if (UnitOfWork.GetCrudRepository<SentenceTask, Guid>() is ISentenceDataRepository repository)
        {
            return repository.ReadFirstUnSeenSentence(userEmail,language);
        }

        return new Result<SentenceTask>().FailAndDefaultValue();
    }

    public IEnumerable<Language> AvailableLanguages()
    {
        if (UnitOfWork.GetCrudRepository<SentenceTask, Guid>() is ISentenceDataRepository repository)
        {
            return repository.ReadAvailableLanguages();
        }

        return new Language[]{};
    }
}