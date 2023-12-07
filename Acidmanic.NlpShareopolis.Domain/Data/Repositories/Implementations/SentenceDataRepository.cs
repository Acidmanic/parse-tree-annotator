using Acidmanic.NlpShareopolis.Domain.Data.Repositories.Abstractions;
using Acidmanic.NlpShareopolis.Domain.Data.Requests;
using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.Utilities.Results;
using EnTier.DataAccess.Meadow;
using Meadow.Contracts;
using Microsoft.Extensions.Logging;

namespace Acidmanic.NlpShareopolis.Domain.Data.Repositories.Implementations;

public class SentenceDataRepository : MeadowCrudRepository<SentenceData, Guid>, ISentenceDataRepository
{
    public SentenceDataRepository(IMeadowConfigurationProvider configurationProvider)
        : base(configurationProvider.GetConfigurations())
    {
    }

    public Result<SentenceData> ReadFirstUnSeenSentence(Guid activityId, string userEmail, string languageShortName)
    {
        var request = new ReadFirstUnSeenSentenceRequest(activityId, userEmail, languageShortName);

        var response = GetEngine().PerformRequest(request, false);

        if (response.Failed)
        {
            Logger.LogError(response.FailureException,
                "Unable to read first unseen Sentence due to exception: {Exception}",
                response.FailureException);
        }

        if (response.FromStorage.Count > 0)
        {
            return new Result<SentenceData>(true, response.FromStorage.First());
        }

        return new Result<SentenceData>().FailAndDefaultValue();
    }
}