// src/app/components/auth/auth.component.ts

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.authService.login(username, password).subscribe(
        data => {
          console.log('Login successful', data);
          this.router.navigate(['/products']);
        },
        error => {
          console.error('Login failed', error);
          this.error = 'Login failed. Please check your credentials.';
        }
      );
    } else {
      this.authService.signup(username, password).subscribe(
        data => {
          console.log('Signup successful', data);
          // After successful signup, log the user in
          this.authService.login(username, password).subscribe(
            loginData => {
              console.log('Auto login after signup successful', loginData);
              this.router.navigate(['/products']);
            },
            loginError => {
              console.error('Auto login after signup failed', loginError);
              this.error = 'Signup successful, but login failed. Please log in manually.';
            }
          );
        },
        error => {
          console.error('Signup failed', error);
          this.error = 'Signup failed. Please try again.';
        }
      );
    }
    form.reset();
  }
}