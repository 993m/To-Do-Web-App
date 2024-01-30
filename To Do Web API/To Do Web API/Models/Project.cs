using System.ComponentModel.DataAnnotations;

namespace To_Do_Web_API.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        
        public virtual ICollection<Task> Tasks { get; set; }
    }
}
