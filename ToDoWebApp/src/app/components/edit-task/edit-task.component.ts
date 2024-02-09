import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task';
import { TaskStatus } from '../../models/taskStatus';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent {
  @Input() task!: Task;
  @Output() tasksUpdated = new EventEmitter<void>();
  taskStatus = TaskStatus;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.task = JSON.parse(params['task']);
    });
  }

  ngOnInit(): void {
  }

  createTask(task: Task): void {
    this.taskService.createTask(task).subscribe(
      (createdTask: Task) => {
      this.router.navigate(['/tasks']);
    },
    error => {
      console.error('Error creating task:', error);
    });
  }

  updateTask(task: Task): void {
    console.log(task);
    this.taskService.updateTask(task).subscribe(
      (updatedTask: Task) => {
      this.router.navigate(['/tasks']);
    },
    error => {
      console.error('Error updating task:', error);
    });
  }



}
