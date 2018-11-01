using Microsoft.EntityFrameworkCore;

namespace TestForBrights.Web.Models
{
    public class UrlDbContext : DbContext
    {
        public DbSet<UrlInfoData> UrlInfoData { get; set; }

        public UrlDbContext()
        {
        }

        public UrlDbContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
