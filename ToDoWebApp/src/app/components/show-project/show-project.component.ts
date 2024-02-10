import { Component, Input } from '@angular/core';
import { Project } from '../../models/project';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrl: './show-project.component.scss'
})
export class ShowProjectComponent {
  @Input() project!: Project;

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.project = JSON.parse(params['project']);
    });
  }

  deleteProject(): void {
    this.projectService.deleteProject(this.project.id!).subscribe(() => {
      this.router.navigate(['/projects']);
    });
  }

  goToEdit(): void {
    this.router.navigate(['/edit-project'], { queryParams: { project: JSON.stringify(this.project) } });
  }

}
