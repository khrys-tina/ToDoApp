namespace ToDoApi.Models
{
    public class TaskItem 
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }

        public int UserId { get; set; }
        public User User { get; set; } = new User();

        public int CategoryId { get; set; }
        public Category Category { get; set; } = new Category();
    }
}
