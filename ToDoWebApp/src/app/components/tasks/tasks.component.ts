import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { TaskStatus } from '../../models/taskStatus';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  tasks: Task[] = [];
  taskStatus = TaskStatus;
 
  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks.sort((a, b) =>
        (Number(a.dueDate) ?? Number.MAX_VALUE) - (Number(b.dueDate) ?? Number.MAX_VALUE));

      this.tasks = this.tasks.filter(task => task.projectId == null);
    });
  }

  goToEdit(task?: Task) : void{
    if (!task) task = new Task();
    this.router.navigate(['/edit-task'], { queryParams: { task: JSON.stringify(task) } });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    });
  }
}