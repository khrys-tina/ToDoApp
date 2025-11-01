using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ToDoApi.Interfaces;
using ToDoApi.Models;

namespace ToDoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto dto)
        {
            try
            {
                var user = new User { Username = dto.Username };
                var createdUser = await _userService.RegisterAsync(user, dto.Password);
                return Ok(new { createdUser.Id, createdUser.Username });
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto dto)
        {
            var token = await _userService.LoginAsync(dto.Username, dto.Password);
            if (token == null) return Unauthorized("Invalid credentials");
            return Ok(new { Token = token });
        }
    }

    public class UserRegisterDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class UserLoginDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
