using Acidmanic.NlpShareopolis.Domain.Data.Requests.Models;
using Acidmanic.NlpShareopolis.Domain.Entities;
using Meadow.Requests;

namespace Acidmanic.NlpShareopolis.Domain.Data.Requests;

public sealed class ReadFirstUnSeenSentenceRequest:MeadowRequest<ActivityByEmailShell,SentenceData>
{
    public ReadFirstUnSeenSentenceRequest(Guid activityId, string userEmail,string languageShortName) : base(true)
    {
        ToStorage = new ActivityByEmailShell
        {
            Id = activityId,
            UserEmail = userEmail,
            LanguageShortName = languageShortName
        };
    }
}