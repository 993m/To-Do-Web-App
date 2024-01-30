using System.ComponentModel.DataAnnotations;

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
        public virtual Project? Project { get; set; }

        public int UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
    }

    public enum TaskStatus
    {
        Pending,
        InProgress,
        Completed
    }
}
