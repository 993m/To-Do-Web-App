import { Component, Input } from '@angular/core';
import { Task } from '../../models/task';
import { TaskStatus } from '../../models/taskStatus';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent {
  @Input() task!: Task;
  taskStatus = TaskStatus;

  constructor(private taskService: TaskService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.task = JSON.parse(params['task']);
    });
  }

  createTask(task: Task): void {
    this.taskService.createTask(task).subscribe(
      (createdTask: Task) => {
        window.history.back();
    },
    error => {
      console.error('Error creating task:', error);
    });
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(task).subscribe(
      (updatedTask: Task) => {
          window.history.back();
    },
    error => {
      console.error('Error updating task:', error);
    });
  }



}
