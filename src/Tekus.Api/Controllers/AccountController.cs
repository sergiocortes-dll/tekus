using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Tekus.Application.DTOs;

namespace Tekus.Api.Controllers;

[ApiController]
[Route("/api/account")]
public class AccountController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public AccountController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost("login")]
    public IActionResult Login(LoginDTO model)
    {
        if (model.Username == "admin" && model.Password == "123")
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("EsteEsUnEjemploDeClaveMuySeguraDe32Caracteres@1234"));
            var signInCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(
                issuer: "https://localhost:5173",
                audience: "https://localhost:5173",
                claims: new List<Claim>(),
                expires: DateTime.Now.AddHours(1),
                signingCredentials: signInCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return Ok(new { Token = tokenString });
        }
        return Unauthorized("Invalid credentials.");
    }
}