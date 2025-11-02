namespace Tekus.Api.Middleware;

public class AuthMiddleware
{
    private readonly RequestDelegate _next;

    public AuthMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // if (context.Request.Headers["User"] == "admin" && context.Request.Headers["Password"] == "123")
        // {
        //     await _next(context);
        // }
        // else
        // {
        //     context.Response.StatusCode = 401;
        //     await  context.Response.WriteAsync("Unauthorized");
        // }
        await _next(context);
    }
}