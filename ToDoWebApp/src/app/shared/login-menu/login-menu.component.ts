import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrl: './login-menu.component.scss'
})
export class LoginMenuComponent {

  constructor(private authService: AuthService){}

  isLoggedIn() : string | null {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
