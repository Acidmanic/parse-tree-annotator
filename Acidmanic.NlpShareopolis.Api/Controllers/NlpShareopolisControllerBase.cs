using Acidmanic.NlpShareopolis.Api.Dtos;
using MediatR;
using MediatR.Pipeline;
using Microsoft.AspNetCore.Mvc;

namespace Acidmanic.NlpShareopolis.Api.Controllers;

public class NlpShareopolisControllerBase : ControllerBase
{
    public NlpShareopolisControllerBase(IMediator mediator)
    {
        Mediator = mediator;
    }

    protected IMediator Mediator { get; }


    protected string? UserEmail()
    {
        return User.Claims.FirstOrDefault(c => c.Type == "email")?.Value?.ToLower();
    }

    protected Task<IActionResult> Query<T>(IRequest<T> query)
    {
        return Query(query, r => r);
    }
    
    protected async Task<IActionResult> Query<TDto,TResponse>(IRequest<TResponse> query, Func<TResponse,TDto> map)
    {
        var response = await Mediator.Send(query);

        var dto = map(response);
        
        return Ok(dto);
    }
    
    
}