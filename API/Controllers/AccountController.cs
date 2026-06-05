using System.Security.Cryptography;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Services;
using API.interfaces;

namespace API.Controllers
{
    
    
    public class AccountController(AppDbContext context, ItokenService tokenService) : BaseApiController
    {
        [HttpPost("register")]//account/register
        public async Task<ActionResult<UserDto>> Register(registerDto registerDto)
        {
            if (await UserExists(registerDto.Email)) return BadRequest("Email is already taken");

            
           using var hash = new HMACSHA512();

           var user = new AppUser

           
           {
            UserName = registerDto.UserName.ToLower(),
            Email = registerDto.Email,
            PasswordHash = hash.ComputeHash(System.Text.Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hash.Key
           };
           context.Users.Add(user);
           await context.SaveChangesAsync();
            return new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Token = tokenService.CreateToken(user)
            };
        }
        

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(loginDto loginDto)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email.ToLower());
            if (user == null) 
            
            return Unauthorized("Invalid email or password");

            using var hash = new HMACSHA512(user.PasswordSalt);
            var computedHash = hash.ComputeHash(System.Text.Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) 

                return Unauthorized("Invalid email or password");
            }

            return new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Token = tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string email)
        {
            return await context.Users.AnyAsync(x => x.Email == email.ToLower());
        }
        
}
}
