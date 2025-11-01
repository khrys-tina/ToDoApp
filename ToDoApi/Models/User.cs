using System.Collections.Generic;

namespace ToDoApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public List<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}
