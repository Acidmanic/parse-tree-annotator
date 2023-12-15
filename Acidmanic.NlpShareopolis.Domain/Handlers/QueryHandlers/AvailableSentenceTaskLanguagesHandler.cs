using Acidmanic.NlpShareopolis.Domain.Queries;
using Acidmanic.NlpShareopolis.Domain.Services.Abstractions;
using Acidmanic.NlpShareopolis.Domain.ValueObjects;
using MediatR;

namespace Acidmanic.NlpShareopolis.Domain.Handlers.QueryHandlers;

public class AvailableSentenceTaskLanguagesHandler:IRequestHandler<AvailableSentenceTaskLanguagesQuery,IEnumerable<Language>>
{

    private readonly ISentenceCrudService _sentenceCrudService;

    public AvailableSentenceTaskLanguagesHandler(ISentenceCrudService sentenceCrudService)
    {
        _sentenceCrudService = sentenceCrudService;
    }

    public async Task<IEnumerable<Language>> Handle(AvailableSentenceTaskLanguagesQuery request, CancellationToken cancellationToken)
    {

        return _sentenceCrudService.AvailableLanguages();
    }
}