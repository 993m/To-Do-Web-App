import { Component, Input } from '@angular/core';
import { Project } from '../../models/project';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  @Input() project!: Project;
  @Input() showDescription: boolean = true;
  nrTasks!: number;

  constructor(private router: Router, private taskService: TaskService) {
    taskService.getTasks().subscribe(tasks => {
      this.nrTasks = tasks.filter(task => task.projectId == this.project.id).length;
    });
  }

  showProjectDetails() {
    this.router.navigate(['/show-project'], { queryParams: { project: JSON.stringify(this.project) } });
  }

}
