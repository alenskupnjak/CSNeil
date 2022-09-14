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

    // Ovdje je setirana baza sa tabelama
    public DbSet<Activity> ActivitiesTable { get; set; }
    public DbSet<ActivityAttendee> ActivityAttendees { get; set; }
    public DbSet<Photo> Photos { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);

      builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new { aa.AppUserId, aa.ActivityId }));

      builder.Entity<ActivityAttendee>()
          .HasOne(u => u.AppUser)
          .WithMany(a => a.Activities)
          .HasForeignKey(aa => aa.AppUserId);

      builder.Entity<ActivityAttendee>()
          .HasOne(u => u.Activity)
          .WithMany(a => a.Attendees)
          .HasForeignKey(aa => aa.ActivityId);
    }

  }
}
