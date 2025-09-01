using System.Net;
using System.Text.Json;
using Million.Domain.Exceptions;

namespace Million.Api.Middleware;

public class GlobalExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionHandlerMiddleware> _logger;

    public GlobalExceptionHandlerMiddleware(RequestDelegate next, ILogger<GlobalExceptionHandlerMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception has occurred: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        HttpStatusCode statusCode;
        string message;

        switch (exception)
        {
            case NotFoundException notFoundException:
                statusCode = HttpStatusCode.NotFound;
                message = notFoundException.Message;
                break;
            // Add other custom exception types here
            // case ValidationException validationException:
            //     statusCode = HttpStatusCode.BadRequest;
            //     message = "One or more validation errors occurred.";
            //     break;
            default:
                statusCode = HttpStatusCode.InternalServerError;
                message = "An unexpected internal server error has occurred.";
                break;
        }

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;

        var errorResponse = new { title = message, description = exception.Message };
        var jsonResponse = JsonSerializer.Serialize(errorResponse);

        return context.Response.WriteAsync(jsonResponse);
    }
}