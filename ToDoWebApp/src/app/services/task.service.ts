import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = 'Tasks';

  constructor(private http: HttpClient) { }

  public getTasks() : Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiUrl}/${this.url}`);
  }

  public createTask(task: Task) : Observable<Task> {
    return this.http.post<Task>(`${environment.apiUrl}/${this.url}`, task);
  }

  public updateTask(task: Task) : Observable<Task> {
    return this.http.put<Task>(`${environment.apiUrl}/${this.url}/${task.id}`, task);
  }

  public deleteTask(id: number) : Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/${this.url}/${id}`);
  }
  
}
