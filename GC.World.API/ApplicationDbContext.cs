using Microsoft.EntityFrameworkCore;
using Models;

namespace GC.World.API
{
    public class ApplicationDbContext :DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
                
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<AppUser> appUsers { get; set; }
        public DbSet<Player> players { get; set; }
    }
}
