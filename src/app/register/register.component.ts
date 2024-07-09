import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

class RegisterCredentials {
  'email': string;
  'confirmEmail': string;
  'password': string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  credentials: RegisterCredentials = { email: '', confirmEmail: '', password: '' };
  emailsMatch: boolean = true;
  submitted: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  checkEmailMatch() {
    this.emailsMatch = this.credentials.email === this.credentials.confirmEmail;
  }

  register(credentials: RegisterCredentials) {
    this.submitted = true;
    this.checkEmailMatch();
    if (this.emailsMatch) {
      this.authService.register(credentials);
      this.router.navigate(['home']);
    }
  }
}
