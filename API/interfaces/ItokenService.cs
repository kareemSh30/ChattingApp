using System;

namespace API.interfaces;
using API.Entities;
public interface ItokenService
{
    string CreateToken(AppUser user);

}
