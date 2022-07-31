using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    // public class DataContext : DbContext

    // Ovime se automatsku dodaje User Identity
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {


        }

        // Ovdje je setirana baza
        public DbSet<Activity> ActivitiesTable { get; set; }

    }
}
