using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.Enums;
using Acidmanic.NlpShareopolis.Domain.Services.Abstractions;
using Acidmanic.NlpShareopolis.Domain.Shared;
using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Results;
using EnTier;
using EnTier.Services;

namespace Acidmanic.NlpShareopolis.Domain.Services.Implementations;

public class SentenceDomainService : ISentenceDomainService
{
    private readonly ISentenceCrudService _sentenceCrudService;
    private readonly ICrudService<UserActivity, Id> _userActivityService;

    public SentenceDomainService(EnTierEssence essence, ISentenceCrudService sentenceCrudService)
    {
        _sentenceCrudService = sentenceCrudService;
        _userActivityService = new CrudService<UserActivity>(essence);
    }

    public Result<SentenceTask> FetchSentence(string? userEmail, Language languageShortname)
    {
        var email = EmailOrDefaultEmail(userEmail);

        var sentenceFound = _sentenceCrudService.FetchFirstUnSeenSentenceData(email, languageShortname);

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

    private Result<UserActivity> UpdateActivityStatus(Id sentenceId, string email, ActivityStatus status)
    {
        var activityUpdate = new UserActivity
        {
            Id = Guid.NewGuid(),
            Status = status,
            ContributionId = sentenceId,
            UserEmail = email
        };

        return UpdateActivityStatus(activityUpdate);
    }

    private Result<UserActivity> UpdateActivityDelivered(Id sentenceId, string email, double wonCredit)
    {
        var activityUpdate = new UserActivity
        {
            Id = Guid.NewGuid(),
            Status = ActivityStatus.Delivered,
            ContributionId = sentenceId,
            UserEmail = email,
            Credit = wonCredit
        };

        return UpdateActivityStatus(activityUpdate);
    }

    private Result<UserActivity> UpdateActivityStatus(UserActivity activityUpdate)
    {
        var persistedActivity = _userActivityService.UpdateOrInsert(activityUpdate, false, false);

        if (persistedActivity is { } activity)
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

    public Result<SentenceTask> SkipFetchSentence(Id sentenceId, string? userEmail)
    {
        var email = EmailOrDefaultEmail(userEmail);

        var foundSentence = _sentenceCrudService.ReadById(sentenceId);

        if (foundSentence is { } sentence)
        {
            UpdateActivityStatus(sentenceId, email, ActivityStatus.Skipped);
                
            return FetchSentence(email, sentence.Language);
        }

        return new Result<SentenceTask>().FailAndDefaultValue();
    }

    public CreditResult<SentenceTask> DeliverFetchSentence(Id sentenceId, string? userEmail, double progress = 0)
    {
        var email = EmailOrDefaultEmail(userEmail);

        var foundSentence = _sentenceCrudService.ReadById(sentenceId);

        if (foundSentence is { } sentence)
        {
           
                var wonCredit = sentence.Credit * progress;

                UpdateActivityDelivered(sentenceId, email, wonCredit);
            

            return FetchSentence(email, sentence.Language).ToCreditResult(wonCredit);
        }

        return new CreditResult<SentenceTask>().Failure();
    }

}