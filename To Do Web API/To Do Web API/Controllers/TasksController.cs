using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using To_Do_Web_API.DTO;
using To_Do_Web_API.Models;
using To_Do_Web_API.Services;

namespace To_Do_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly TasksService _tasksService;
        private readonly IMapper _mapper;

        public TasksController(TasksService tasksService, IMapper mapper)
        {
            _tasksService = tasksService;
            _mapper = mapper;
        }

        [NonAction]
        public string GetCurrentAuthenticatedUserId()
        {
            var currentUser = User;
            return currentUser.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDTO>> GetTask(int id)
        {
            var task = await _tasksService.GetTaskAsync(id);
            var taskDTO = _mapper.Map<TaskDTO>(task);

            if (task == null)
            {
                return NotFound();
            }

            return Ok(taskDTO);
        }

        // GET: api/Tasks/Project/5
        [HttpGet("Project/{projectId}")]
        public async Task<ActionResult<IEnumerable<TaskDTO>>> GetTasksByProjectId(int projectId)
        {
            var tasks = await _tasksService.GetTasksByProjectIdAsync(projectId);
            var tasksDTO = _mapper.Map<IEnumerable<TaskDTO>>(tasks);
        
            if (tasks == null)
            {
                return NotFound();
            }

            return Ok(tasksDTO);
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDTO>>> GetCurrentUserTasks()
        {
            string userId = GetCurrentAuthenticatedUserId();
            var tasks = await _tasksService.GetTasksByUserIdAsync(userId);
            var tasksDTO = _mapper.Map<IEnumerable<TaskDTO>>(tasks);

            if (tasks == null)
            {
                return NotFound();
            }

            return Ok(tasksDTO);
        }

        // PUT: api/Tasks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id, TaskDTO taskDTO)
        {
            if (id != taskDTO.Id)
            {
                return BadRequest();
            }

            var task = await _tasksService.GetTaskAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            try
            {
                task = _mapper.Map<Models.Task>(taskDTO);
                task.UserId = GetCurrentAuthenticatedUserId();
                await _tasksService.PutTaskAsync(task);
                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while processing the request.");
            }

        }

        // POST: api/Tasks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TaskDTO>> PostTask(TaskDTO taskDTO)
        {
            try
            {
                var task = _mapper.Map<Models.Task>(taskDTO);
                task.UserId = GetCurrentAuthenticatedUserId();
                var createdTask = await _tasksService.PostTaskAsync(task);
                var resourceUri = new Uri($"/api/Tasks/{createdTask.Id}", UriKind.Relative);
                var createdTaskDTO = _mapper.Map<TaskDTO>(createdTask);
                return Created(resourceUri, createdTaskDTO);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while processing the request.");
            }
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _tasksService.GetTaskAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            await _tasksService.DeleteTaskAsync(id);

            return Ok();
        }
    }
}
