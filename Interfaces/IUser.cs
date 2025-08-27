using Models;

namespace Interfaces
{
    public interface IUser
    {
        Task<bool> InsertUpdate(AppUser appUser);
        Task<List<AppUser>> GetUsers();
    }
}
