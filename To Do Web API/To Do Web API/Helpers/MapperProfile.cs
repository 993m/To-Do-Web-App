using AutoMapper;

namespace To_Do_Web_API.Helpers
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Models.Task, DTO.TaskDTO>();
            CreateMap<DTO.TaskDTO, Models.Task>();

            CreateMap<Models.Project, DTO.ProjectDTO>();
            CreateMap<DTO.ProjectDTO, Models.Project>();
        }
    }
}
