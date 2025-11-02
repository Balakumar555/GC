using Models;

namespace Interfaces
{
    public interface IPlayer
    {
        Task<bool> InsertUpdate(List<Player> players);
        Task<List<Player>> GetUsers();
    }
}
