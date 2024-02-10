import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { authGuard } from './guards/auth.guard';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ShowProjectComponent } from './components/show-project/show-project.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [authGuard]
  },
  {
    path: 'edit-task',
    component: EditTaskComponent,
    canActivate: [authGuard]
  },
  {
    path: 'edit-project',
    component: EditProjectComponent,
    canActivate: [authGuard]
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'show-project',
    component: ShowProjectComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
