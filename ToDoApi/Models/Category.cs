using System.Collections.Generic;

namespace ToDoApi.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}
