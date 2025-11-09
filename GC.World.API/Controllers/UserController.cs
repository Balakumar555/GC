using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace GC.World.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUser user;
        public UserController(IUser _user)
        {
            this.user = _user;     
        }
        [HttpGet("GetUsers")]
        public async Task<IActionResult> GetUsers()
        {
            var data = await user.GetUsers();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> InsertUpdate(AppUser users)
        {
            var response = await user.InsertUpdate(users);
            return Ok(response);
        }
    }
}
