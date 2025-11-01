using System.Threading.Tasks;
using ToDoApi.Models;

namespace ToDoApi.Interfaces
{
    public interface IUserService
    {
        Task<User> RegisterAsync(User user, string password);
        Task<string> LoginAsync(string username, string password);
        Task<User> GetByIdAsync(int id);
    }
}
