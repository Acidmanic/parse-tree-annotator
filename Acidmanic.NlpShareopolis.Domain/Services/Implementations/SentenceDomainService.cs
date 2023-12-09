using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.Enums;
using Acidmanic.NlpShareopolis.Domain.Services.Abstractions;
using Acidmanic.NlpShareopolis.Domain.Shared;
using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Results;
using EnTier;
using EnTier.Services;
using Org.BouncyCastle.Crypto;

namespace Acidmanic.NlpShareopolis.Domain.Services.Implementations;

public class SentenceDomainService : ISentenceDomainService
{
    private readonly ISentenceDataService _sentenceDataService;
    private readonly ICrudService<UserActivity, Id> _userActivityService;

    public SentenceDomainService(EnTierEssence essence, ISentenceDataService sentenceDataService)
    {
        _sentenceDataService = sentenceDataService;
        _userActivityService = new CrudService<UserActivity>(essence);
    }

    public Result<SentenceData> FetchSentence(string? userEmail, LanguageShortName languageShortname)
    {
        var email = EmailOrDefaultEmail(userEmail);

        var sentenceFound = _sentenceDataService.FetchFirstUnSeenSentenceData(email, languageShortname);

        if (sentenceFound)
        {
            var activity = new UserActivity
            {
                Id = Guid.NewGuid(),
                Status = ActivityStatus.Seen,
                ContributionId = sentenceFound.Value.Id,
                UserEmail = email
            };
            _userActivityService.UpdateOrInsert(activity, false, false);
        }

        return sentenceFound;
    }

    private Result<UserActivity> UpdateSkipped(Id sentenceId, string email)
    {
        var activityUpdate = new UserActivity
        {
            Id = Guid.NewGuid(),
            Status = ActivityStatus.Skipped,
            ContributionId = sentenceId,
            UserEmail = email
        };

        var skippedActivity = _userActivityService.UpdateOrInsert(activityUpdate, false, false);

        if (skippedActivity is { } activity)
        {
            return new Result<UserActivity>(true, activity);
        }

        return new Result<UserActivity>().FailAndDefaultValue();
    }


    private string EmailOrDefaultEmail(string? email)
    {
        var unWrappedEmail = string.IsNullOrEmpty(email) ? "anonymouse@nlpsharopolis.com" : email;

        return unWrappedEmail;
    }

    public Result<SentenceData> SkipSentence(Id sentenceId, string? userEmail)
    {
        var email = EmailOrDefaultEmail(userEmail);

        UpdateSkipped(sentenceId, email);

        var foundSentence = _sentenceDataService.ReadById(sentenceId);

        if (foundSentence is { } sentence)
        {
            return FetchSentence(email, sentence.LanguageShortName);
        }
        
        return new Result<SentenceData>().FailAndDefaultValue();
    }
}