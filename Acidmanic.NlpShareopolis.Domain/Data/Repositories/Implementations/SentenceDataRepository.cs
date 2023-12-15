using Acidmanic.NlpShareopolis.Domain.Data.Repositories.Abstractions;
using Acidmanic.NlpShareopolis.Domain.Data.Requests;
using Acidmanic.NlpShareopolis.Domain.Data.Requests.Models;
using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Results;
using EnTier.DataAccess.Meadow;
using Meadow.Contracts;
using Microsoft.Extensions.Logging;

namespace Acidmanic.NlpShareopolis.Domain.Data.Repositories.Implementations;

public class SentenceDataRepository : MeadowCrudRepository<SentenceTask, Guid>, ISentenceDataRepository
{
    public SentenceDataRepository(IMeadowConfigurationProvider configurationProvider)
        : base(configurationProvider.GetConfigurations())
    {
    }

    public Result<SentenceTask> ReadFirstUnSeenSentence( string userEmail, string languageShortName)
    {
        var request = new ReadFirstUnSeenSentenceRequest(userEmail, languageShortName);

        var response = GetEngine().PerformRequest(request, false);

        if (response.Failed)
        {
            Logger.LogError(response.FailureException,
                "Unable to read first unseen Sentence due to exception: {Exception}",
                response.FailureException);
        }

        if (response.FromStorage.Count > 0)
        {
            return new Result<SentenceTask>(true, response.FromStorage.First());
        }

        return new Result<SentenceTask>().FailAndDefaultValue();
    }

    public IEnumerable<Language> ReadAvailableLanguages()
    {
        var request = new ReadAvailableSentenceTaskLanguagesRequest();

        var response = GetEngine().PerformRequest(request, false);

        if (response.Failed)
        {
            Logger.LogError(response.FailureException,
                "Unable to read available languages due to exception: {Exception}",
                response.FailureException);
        }

        return request.FromStorage.Select( l => l.Language);
    }
}