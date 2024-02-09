using System.ComponentModel.DataAnnotations;
using To_Do_Web_API.DTO;

namespace To_Do_Web_API.Models
{
    public class Task
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public TaskStatus Status { get; set; }
        public DateTime? DueDate { get; set; }


        public int? ProjectId { get; set; }
        public Project? Project { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

    }

    public enum TaskStatus
    {
        Pending,
        InProgress,
        Completed
    }
}
