import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthComponent } from './components/auth/auth.component';
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';
import { LoginMenuComponent } from './shared/login-menu/login-menu.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProjectsComponent } from './components/projects/projects.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { ProjectComponent } from './components/project/project.component';
import { ShowProjectComponent } from './components/show-project/show-project.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavMenuComponent,
    LoginMenuComponent,
    TasksComponent,
    EditTaskComponent,
    ProjectsComponent,
    EditProjectComponent,
    ProjectComponent,
    ShowProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    FlexLayoutModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
