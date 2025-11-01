using Microsoft.EntityFrameworkCore;
using ToDoApi.Models;
using TaskItem = ToDoApi.Models.TaskItem; 

namespace ToDoApi.Data
{
    public class ToDoDbContext : DbContext
    {
        public ToDoDbContext(DbContextOptions<ToDoDbContext> options) : base(options) { }

        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
