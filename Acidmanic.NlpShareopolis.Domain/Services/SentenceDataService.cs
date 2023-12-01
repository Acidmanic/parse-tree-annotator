using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.Shared;
using Acidmanic.Utilities.Results;
using EnTier;
using EnTier.Services;

namespace Acidmanic.NlpShareopolis.Domain.Services;

public class SentenceDataService
{


    private readonly CrudService<SentenceData, Guid> _sentenceCrud;

    public SentenceDataService(EnTierEssence essence)
    {
        _sentenceCrud = new CrudService<SentenceData, Guid>(essence);
    }



    public Result<SentenceData> ReadUnSeenSentenceData()
    {
        return new Result<SentenceData>().FailAndDefaultValue();
    }
}