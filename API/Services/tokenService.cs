using System;
using API.interfaces;
using API.Entities;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;

namespace API.Services;

public class tokenService(IConfiguration config) : ItokenService
{
    public string CreateToken(AppUser user)
    {
        var tokenkey = config["TokenKey"] ?? throw new Exception("cant find token key");

        if (tokenkey.Length < 64) throw new Exception("TokenKey needs to be at least 64 characters");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenkey));

        var claims = new List<Claim>
        {
           new (ClaimTypes.Email,user.Email),
            new (ClaimTypes.NameIdentifier,user.Id.ToString()),
            new (ClaimTypes.Name,user.UserName)
        };

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = creds
        };

        var tokenHandler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
