using MediatR;
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
    
    protected async Task<IActionResult> Query<T>(IRequest<T> query)
    {
        try
        {
            return Ok(await Mediator.Send(query));
        }
        catch (Exception e)
        {
            return Problem(detail: e.Message, title: e.GetType().Name);
        }
    }
}