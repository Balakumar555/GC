using GC.World.API.Helpers;
using Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;

namespace GC.World.API.Data
{
    public class UserRepo : IUser
    {
            private readonly ApplicationDbContext dbContext;
            public UserRepo(ApplicationDbContext _dbContext)
            {
                this.dbContext = _dbContext;
            }
            public async Task<List<AppUser>> GetUsers()
            {
                return await dbContext.appUsers.ToListAsync();
            }

            public async Task<bool> InsertUpdate(AppUser appUser)
            {
                if (appUser.Id == Guid.Empty || appUser.Id == null)
                {
                    await dbContext.appUsers.AddAsync(appUser);
                }
                else
                {
                    var existingAppUser = await dbContext.appUsers.FindAsync(appUser.Id);
                    if (existingAppUser != null)
                    {
                        bool hasChanges = EntityUpdater.HasChanges(existingAppUser, appUser);
                        if (hasChanges)
                        {
                            EntityUpdater.UpdateProperties(existingAppUser, appUser);
                        }
                    }
                }
                await dbContext.SaveChangesAsync();
                return true;
            }
        }
    
}
