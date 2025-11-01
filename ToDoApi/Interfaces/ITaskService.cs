using System.Collections.Generic;
using System.Threading.Tasks;
using TaskItem = ToDoApi.Models.TaskItem;

namespace ToDoApi.Interfaces
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> GetAllTasksAsync();
        Task<TaskItem> GetTaskByIdAsync(int id);
        Task<TaskItem> CreateTaskAsync(TaskItem task);
        Task<TaskItem> UpdateTaskAsync(TaskItem task);
        Task<bool> DeleteTaskAsync(int id);

        Task<IEnumerable<TaskItem>> GetTasksPagedAsync(int page, int pageSize);

        Task<IEnumerable<TaskItem>> GetTasksByCategoryAsync(int categoryId);

        Task<IEnumerable<TaskItem>> SearchTasksAsync(string searchTerm);
    }
}
