using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace GC.World.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayer _player;
        public PlayerController(IPlayer player)
        {
            this._player = player;  
        }
        [HttpGet("GetPlayers")]
        public async Task<IActionResult> GetPlayers()
        {
            var data = await _player.GetUsers();
            return Ok(data);
        }
        [HttpPost("SavePlayers")]
        public async Task<IActionResult> SavePlayers(Player players)
        {
            var response = await _player.InsertUpdate(players);
            return Ok(response);

        }
    }
}
