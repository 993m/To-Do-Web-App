using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using To_Do_Web_API.Data;

namespace To_Do_Web_API.Services
{
    public class TasksService
    {
        public readonly DataContext _context;
        public TasksService(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Models.Task>> GetTasksAsync()
        {
            return  await _context.Tasks.ToListAsync();
        }

        public async Task<IEnumerable<Models.Task>> GetTasksByProjectIdAsync(int projectId)
        {
            return await _context.Tasks.Where(t => t.ProjectId == projectId).ToListAsync();
        }

        public async Task<IEnumerable<Models.Task>> GetTasksByUserIdAsync(string userId)
        {
            return await _context.Tasks.Where(t => string.Equals(t.UserId, userId)).ToListAsync();
        }

        public async Task<Models.Task?> GetTaskAsync(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        public async Task<bool> PutTaskAsync(Models.Task task)
        {
            var existingTask = await _context.Tasks.FindAsync(task.Id);
            _context.Entry(existingTask).CurrentValues.SetValues(task);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Models.Task> PostTaskAsync(Models.Task task)
        {
           await _context.Tasks.AddAsync(task);
           await _context.SaveChangesAsync();
           return task;
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            _context.Tasks.Remove(task);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
