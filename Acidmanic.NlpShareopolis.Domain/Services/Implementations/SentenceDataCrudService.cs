using Acidmanic.NlpShareopolis.Domain.Data.Repositories.Abstractions;
using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.Services.Abstractions;
using Acidmanic.NlpShareopolis.Domain.Shared;
using Acidmanic.Utilities.Results;
using EnTier;

namespace Acidmanic.NlpShareopolis.Domain.Services.Implementations;

public class SentenceDataCrudService:CrudService<SentenceData>, ISentenceDataService
{
    public SentenceDataCrudService(EnTierEssence essence) : base(essence)
    {
    }

    public Result<SentenceData> FetchFirstUnSeenSentenceData( string userEmail,string languageShortName)
    {
        if (UnitOfWork.GetCrudRepository<SentenceData, Guid>() is ISentenceDataRepository repository)
        {
            return repository.ReadFirstUnSeenSentence(userEmail,languageShortName);
        }

        return new Result<SentenceData>().FailAndDefaultValue();
    }
}