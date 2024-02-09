using System.ComponentModel.DataAnnotations;

namespace To_Do_Web_API.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        
        public ICollection<Task> Tasks { get; set; }
    }
}
