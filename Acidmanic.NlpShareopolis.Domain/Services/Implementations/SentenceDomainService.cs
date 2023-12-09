using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.Enums;
using Acidmanic.NlpShareopolis.Domain.Services.Abstractions;
using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Results;
using EnTier.Services;

namespace Acidmanic.NlpShareopolis.Domain.Services.Implementations;

public class SentenceDomainService:ISentenceDomainService
{
    private readonly ISentenceDataService _sentenceDataService;
    private readonly ICrudService<UserActivity, Id> _userActivityService;

    public SentenceDomainService(ISentenceDataService sentenceDataService, ICrudService<UserActivity, Id> userActivityService)
    {
        _sentenceDataService = sentenceDataService;
        _userActivityService = userActivityService;
    }

    public Result<SentenceData> FetchSentence(string? userEmail, LanguageShortName languageShortname)
    {
        var email = string.IsNullOrEmpty(userEmail) ? "anonymouse@nlpsharopolis.com" : userEmail;

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
    
    private Result<UserActivity> UpdateSkipped(Id activityId)
    {
        var sentenceActivity = _userActivityService.ReadById(activityId);

        if (sentenceActivity is { } activity)
        {
            activity.Status = ActivityStatus.Skipped;

            _userActivityService.UpdateById(activityId, activity, false, false);

            return new Result<UserActivity>(true, activity);
        }

        return new Result<UserActivity>().FailAndDefaultValue();
    }
    

    public Result<SentenceData> SkipSentence(Id activityId)
    {
        var skippedActivity = UpdateSkipped(activityId);

        if (skippedActivity)
        {
            var foundSentence = _sentenceDataService.ReadById(skippedActivity.Value.Id);

            if (foundSentence is { } sentence)
            {
                return FetchSentence(skippedActivity.Value.UserEmail, sentence.LanguageShortName);
            }
        }

        return new Result<SentenceData>().FailAndDefaultValue();
    }
}