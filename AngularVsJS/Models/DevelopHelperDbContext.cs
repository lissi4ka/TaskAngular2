using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AngularVsJS.Models
{
    public class DevelopHelperDbContext : DbContext
    {

        public DevelopHelperDbContext(DbContextOptions<DevelopHelperDbContext> options)
            : base(options)
        {
        }

        public DbSet<Position> Positions { get; set; }
    }
}
