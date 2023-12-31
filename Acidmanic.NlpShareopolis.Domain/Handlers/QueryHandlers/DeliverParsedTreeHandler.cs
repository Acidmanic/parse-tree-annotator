using Acidmanic.NlpShareopolis.Domain.Entities;
using Acidmanic.NlpShareopolis.Domain.Queries;
using Acidmanic.NlpShareopolis.Domain.Services.Abstractions;
using Acidmanic.NlpShareopolis.Domain.Shared;
using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using Acidmanic.Utilities.Results;
using EnTier;
using EnTier.Services;
using MediatR;

namespace Acidmanic.NlpShareopolis.Domain.Handlers.QueryHandlers;

public class DeliverParsedTreeHandler : IRequestHandler<DeliverParsedTreeQuery, CreditResult<SentenceTask>>
{
    private readonly ICrudService<ParsedSentence, Id> _parsedTreeCrudService;
    private readonly ISentenceDomainService _sentenceDomainService;

    public DeliverParsedTreeHandler(EnTierEssence essence, ISentenceDomainService sentenceDomainService)
    {
        _sentenceDomainService = sentenceDomainService;
        _parsedTreeCrudService = new CrudService<ParsedSentence>(essence);
    }

    public Task<CreditResult<SentenceTask>> Handle(DeliverParsedTreeQuery request, CancellationToken cancellationToken)
    {
        var parsedSentence = new ParsedSentence
        {
            Id = Guid.NewGuid(),
            ContributionId = request.SentenceId,
            UserEmail = request.UserEmail??"",
            ParsedTree = request.ParsedTree,
            HardProgress = request.HardProgress,
            SoftProgress = request.SoftProgress
        };

        var inserted = _parsedTreeCrudService.Add(parsedSentence, false, false) != null;

        CreditResult<SentenceTask> result = inserted
            ? _sentenceDomainService.DeliverFetchSentence(request.SentenceId, request.UserEmail,request.SoftProgress)
            : _sentenceDomainService.FetchSentence(request.UserEmail, request.Language).ToCreditResult();

        return Task.FromResult(result);
    }
}