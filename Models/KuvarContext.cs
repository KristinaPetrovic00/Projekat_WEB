using Microsoft.EntityFrameworkCore;
using System.Linq;
namespace Models
{
    public class KuvarContext:DbContext
    {

        public DbSet<Jelo> Jela {get;set;}

        public DbSet<Sastojak> Sastojci {get;set;}

        public DbSet<Pice> Pica {get;set;}

        public DbSet<Kuvar> Kuvar {get;set;}
        public DbSet<JeloSastojak> JelaSastojci{get;set;}

        public DbSet<NutritivneVrednosti>NutritivneVrednosti{get;set;}

        public DbSet<Saveti> Saveti {get;set;}

        public DbSet<Tip> Tipovi {get;set;}

        public DbSet<PodTip> PodTipovi {get;set;}

        public DbSet<Slozenost> Slozenost {get;set;}

        public DbSet<Jedinica> Jedinice { get; set; }

        public KuvarContext(DbContextOptions options) :base(options)
        {
            
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<NutritivneVrednosti>()
                                .HasOne(n=>n.Jelo)
                                .WithOne(n=>n.NutritivneVrednosti)
                                .HasForeignKey<Jelo>(n=>n.ForeignKeyNV);
        }
    }
}