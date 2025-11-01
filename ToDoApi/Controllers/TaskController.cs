using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ToDoApi.Interfaces;
using ToDoApi.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace ToDoApi.Controllers
{
    [Authorize] 
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        // GET: api/Task
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] int? categoryId = null,
            [FromQuery] string? searchTerm = null)
        {
            var tasks = await _taskService.GetAllTasksAsync();

            
            if (categoryId.HasValue)
                tasks = tasks.Where(t => t.CategoryId == categoryId.Value);

            
            if (!string.IsNullOrWhiteSpace(searchTerm))
                tasks = tasks.Where(t => t.Title.Contains(searchTerm) || t.Description.Contains(searchTerm));

            tasks = tasks.Skip((page - 1) * pageSize).Take(pageSize);

            return Ok(tasks);
        }

        // GET: api/Task/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTask(int id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);
            if (task == null) return NotFound();
            return Ok(task);
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<TaskItem>> CreateTask(TaskItem task)
        {
            if (string.IsNullOrWhiteSpace(task.Title))
                return BadRequest("Title is required");

            // Встановлюємо UserId із JWT токена
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            task.UserId = userId;

            var createdTask = await _taskService.CreateTaskAsync(task);
            return CreatedAtAction(nameof(GetTask), new { id = createdTask.Id }, createdTask);
        }

        // PUT: api/Task/5
        [HttpPut("{id}")]
        public async Task<ActionResult<TaskItem>> UpdateTask(int id, TaskItem task)
        {
            if (id != task.Id)
                return BadRequest();

            
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (task.UserId != userId)
                return Forbid("You can only update your own tasks");

            var updatedTask = await _taskService.UpdateTaskAsync(task);
            return Ok(updatedTask);
        }

        // DELETE: api/Task/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);
            if (task == null) return NotFound();

            
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (task.UserId != userId)
                return Forbid("You can only delete your own tasks");

            var deleted = await _taskService.DeleteTaskAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
