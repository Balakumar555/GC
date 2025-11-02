using Models;

namespace Interfaces
{
    public interface IPlayer
    {
        Task<bool> InsertUpdate(Player players);
        Task<List<Player>> GetUsers();
    }
}
