using Microsoft.AspNetCore.Identity;

namespace To_Do_Web_API.Models
{
    public class ApplicationUser : IdentityUser
    { 
        public ICollection<Project> Projects { get; set; }
        
        public ICollection<Task> Tasks { get; set; }
    }
}
