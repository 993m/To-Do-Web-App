using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using To_Do_Web_API.DTO;
using To_Do_Web_API.Models;
using To_Do_Web_API.Services;

namespace To_Do_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProjectsController : ControllerBase
    {
        private readonly ProjectsService _projectsService;
        private readonly IMapper _mapper;   

        public ProjectsController(ProjectsService projectsService, IMapper mapper)
        {
            _projectsService = projectsService;
            _mapper = mapper;   
        }

        [NonAction]
        public string GetCurrentAuthenticatedUserId()
        {
            var currentUser = User;
            return currentUser.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }


        // GET: api/Projects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDTO>> GetProject(int id)
        {
            var project = await _projectsService.GetProjectAsync(id);
            var projectDTO = _mapper.Map<ProjectDTO>(project);

            if (project == null)
            {
                return NotFound();
            }

            return Ok(projectDTO);
        }

        // GET: api/Projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDTO>>> GetCurrentUserProjects()
        {
            string userId = GetCurrentAuthenticatedUserId();
            var projects = await _projectsService.GetProjectsByUserIdAsync(userId);
            var projectsDTO = _mapper.Map<IEnumerable<ProjectDTO>>(projects);
        
            if (projects == null)
            {
                return NotFound();
            }

            return Ok(projectsDTO);
        }

        // PUT: api/Projects/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(int id, ProjectDTO projectDTO)
        {
            if (id != projectDTO.Id)
            {
                return BadRequest();
            }

            var project = await _projectsService.GetProjectAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            try
            {
                project = _mapper.Map<Project>(projectDTO);
                project.UserId = GetCurrentAuthenticatedUserId();
                await _projectsService.PutProjectAsync(project);
                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while processing the request.");
            }
        }

        // POST: api/Projects
        [HttpPost]
        public async Task<ActionResult<ProjectDTO>> PostProject(ProjectDTO projectDTO)
        {
            try
            {
                var project = _mapper.Map<Project>(projectDTO);
                project.UserId = GetCurrentAuthenticatedUserId();
                var createdProject = await _projectsService.PostProjectAsync(project);
                var resourceUri = new Uri($"/api/Projects/{createdProject.Id}", UriKind.Relative);
                var createdProjectDTO = _mapper.Map<ProjectDTO>(createdProject);
                return Created(resourceUri, createdProjectDTO);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while processing the request.");
            }
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProjectDTO>> DeleteProject(int id)
        {
            var project = await _projectsService.GetProjectAsync(id);
            if (project == null)
            {
                return NotFound();
            }
            await _projectsService.DeleteProjectAsync(id);
            return Ok();
        }
    }
}
