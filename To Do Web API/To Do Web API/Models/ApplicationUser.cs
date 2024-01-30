using Microsoft.AspNetCore.Identity;

namespace To_Do_Web_API.Models
{
    public class ApplicationUser : IdentityUser
    {
        
        public virtual ICollection<Project> Projects { get; set; }
        
        public virtual ICollection<Task> Tasks { get; set; }
    }
}
