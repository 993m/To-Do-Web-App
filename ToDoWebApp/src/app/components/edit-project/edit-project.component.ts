import { Component, Input } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss'
})
export class EditProjectComponent {
  @Input() project!: Project;

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.project = JSON.parse(params['project']);
    });
  }

  createProject(project: Project): void {
    this.projectService.createProject(project).subscribe(
      (createdProject: Project) => {
        this.router.navigate(['/show-project'], { queryParams: { project: JSON.stringify(createdProject) } });
    },
    error => {
      console.error('Error creating project:', error);
    });
  }

  updateProject(project: Project): void {
    this.projectService.updateProject(project).subscribe(
      (updatedProject: Project) => {
        this.router.navigate(['/show-project'], { queryParams: { project: JSON.stringify(project) } });
    },
    error => {
      console.error('Error updating project:', error);
    });
  }

}
