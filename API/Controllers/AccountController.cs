﻿using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
  [AllowAnonymous]
  [ApiController]
  [Route("api/[controller]")]
  public class AccountController : ControllerBase
  {
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly TokenService _tokenService;

    public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService)
    {
      _userManager = userManager;
      _signInManager = signInManager;
      _tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
      var user = await _userManager.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == loginDto.Email);
      //var user = await _userManager.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

      if (user == null) return Unauthorized();

      var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

      if (result.Succeeded)
      {
        return CreateUserObject(user);
        //return new UserDto
        //{
        //  DisplayName = user.DisplayName,
        //  Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
        //  Token = _tokenService.CreateToken(user),
        //  Username = user.UserName,
        //};
      }

      return Unauthorized();
    }

    // registracija novi usera
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
      if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
      {
        //return BadRequest("Email taken");
        ModelState.AddModelError("email", "Email taken");
        return ValidationProblem();
      }
      if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
      {
        //return BadRequest("Username taken");
        ModelState.AddModelError("username", "Username taken");
        return ValidationProblem();
      }

      var user = new AppUser
      {
        DisplayName = registerDto.DisplayName,
        Email = registerDto.Email,
        UserName = registerDto.Username
      };

      var result = await _userManager.CreateAsync(user, registerDto.Password);

      if (result.Succeeded)
      {
        return CreateUserObject(user);
        //return new UserDto
        //{
        //  DisplayName = user.DisplayName,
        //  Image = null, 
        //  Token = _tokenService.CreateToken(user),
        //  Username=user.UserName, 
        //};
      }

      return BadRequest("Problem registering user, nesto nije u redu, moguce slab pass ili slicno");
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
      //var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

      var user = await _userManager.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

      return CreateUserObject(user);
      //return new UserDto
      //{
      //  DisplayName = user.DisplayName,
      //  Image = null,
      //  Token = _tokenService.CreateToken(user),
      //  Username = user.UserName
      //};
    }

    private UserDto CreateUserObject(AppUser user)
    {
      return new UserDto
      {
        DisplayName = user.DisplayName,
        Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
        Token = _tokenService.CreateToken(user),
        Username = user.UserName
      };
    }

  }
}
