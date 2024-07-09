import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

class Credential {
  'email': string;
  'password': string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: Credential = new Credential();

  constructor(private authService: AuthService, private router: Router) {}

  async login(credentials: Credential) {
    try {
      await this.authService.login(credentials);
      this.router.navigate(['home']);
    } catch (error) {
      console.error('Login falhou', error);
    }
  }

}
