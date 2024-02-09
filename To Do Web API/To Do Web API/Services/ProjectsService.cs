using Microsoft.EntityFrameworkCore;
using To_Do_Web_API.Data;
using To_Do_Web_API.Models;

namespace To_Do_Web_API.Services
{
    public class ProjectsService
    {
        public readonly DataContext _context;
        public ProjectsService(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Project>> GetProjectsAsync()
        {
            return  await _context.Projects.ToListAsync();
        }

        public async Task<IEnumerable<Project>> GetProjectsByUserIdAsync(string userId)
        {
            return await _context.Projects.Where(p => string.Equals(p.UserId, userId)).ToListAsync();
        }

        public async Task<Project?> GetProjectAsync(int id)
        {
            return await _context.Projects.FindAsync(id);
        }

        public async Task<bool> PutProjectAsync(Project project)
        {
            var existingProject = await _context.Projects.FindAsync(project.Id);
            _context.Entry(existingProject).CurrentValues.SetValues(project);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Project> PostProjectAsync(Project project)
        {
           await _context.Projects.AddAsync(project);
           await _context.SaveChangesAsync();
           return project;
        }

        public async Task<bool> DeleteProjectAsync(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            _context.Projects.Remove(project);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
