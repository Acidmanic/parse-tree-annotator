using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.Enums;
using Acidmanic.NlpShareopolis.Domain.Queries;
using Acidmanic.NlpShareopolis.Domain.Services.Abstractions;
using Acidmanic.NlpShareopolis.Domain.Shared;
using Acidmanic.Utilities.Results;
using EnTier;
using EnTier.Services;
using MediatR;

namespace Acidmanic.NlpShareopolis.Domain.Handlers.QueryHandlers;

public class FetchUnSeenSentenceQueryHandler : IRequestHandler<FetchUnSeenSentenceQuery, Result<SentenceData>>
{
    private readonly ISentenceDataService _sentenceDataService;
    private readonly ICrudService<UserActivity, Guid> _userActivityService; 

    public FetchUnSeenSentenceQueryHandler(EnTierEssence essence, ISentenceDataService sentenceDataService)
    {
        _sentenceDataService = sentenceDataService;

        _userActivityService = new CrudService<UserActivity>(essence);
    }

    public Task<Result<SentenceData>> Handle(FetchUnSeenSentenceQuery query, CancellationToken cancellationToken)
    {
        var sentenceFound = _sentenceDataService.FetchFirstUnSeenSentenceData(
            query.Email ?? "", query.Language);


        if (sentenceFound && query.Email is { Length: > 0 } email)
        {
            var activity = new UserActivity
            {
                Id = new Guid(),
                Status = ActivityStatus.Seen,
                ContributionId = sentenceFound.Value.Id,
                UserEmail = email
            };
            _userActivityService.UpdateOrInsert(activity, false, false);
        }
        
        return Task.FromResult(sentenceFound);
    }
}