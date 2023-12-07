using Acidmanic.NlpShareopolis.Domain.Exceptions;
using Newtonsoft.Json;

namespace Acidmanic.NlpShareopolis.Api.Infrastructure;

public class NspExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;

    public NspExceptionHandlerMiddleware(RequestDelegate next)
    {
        this._next = next;
    }

    public Task InvokeAsync(HttpContext context)
    {
        return HandleExceptions(context, _next);
    }


    public static async Task HandleExceptions(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (Exception e)
        {
            if (e is DomainExceptionBase domainException)
            {
                await context.Response.WriteAsync(JsonConvert.SerializeObject(new
                {
                    Id = domainException.UniqueId,
                    Message = domainException.Message
                }));
            }
        }
    }
}