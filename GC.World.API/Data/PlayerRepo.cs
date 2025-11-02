using GC.World.API.Helpers;
using Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;

namespace GC.World.API.Data
{
    public class PlayerRepo : IPlayer
    {
        private readonly ApplicationDbContext dbContext;
        public PlayerRepo(ApplicationDbContext _dbContext)
        {
            this.dbContext = _dbContext;
        }
        public async Task<List<Player>> GetUsers()
        {
            return await dbContext.players.ToListAsync();
        }

        public async Task<bool> InsertUpdate(Player player)
        {
           
                if (player.Id == 0)
                {
                    await dbContext.players.AddAsync(player);
                }
                else
                {
                    var existingPlayer = await dbContext.players.FindAsync(player.Id);
                    if (existingPlayer != null)
                    {
                        bool hasChanges = EntityUpdater.HasChanges(existingPlayer, player);
                        if (hasChanges)
                        {
                            EntityUpdater.UpdateProperties(existingPlayer, player);
                        }
                    }
                    else
                    {
                        // Optional: Handle case where player with ID exists but not in database
                        // You might want to add it or throw an exception
                        await dbContext.players.AddAsync(player);
                    }
                }           

            await dbContext.SaveChangesAsync();
            return true;
        }
    }
}
