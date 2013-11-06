using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace DurandalFileUpload.Models {
    public class FilesDbContext : DbContext {
        public FilesDbContext()
            : base("name=FilesDb") {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder) {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }

        public DbSet<File> Files { get; set; }
    }
}