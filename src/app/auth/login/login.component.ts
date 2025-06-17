import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<void>();

  loginData = {
    username: '',
    password: '',
    rememberMe: false
  };

  isLoading = false;
  showPassword = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onLogin() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginData.username, this.loginData.password).subscribe({
      next: (user) => {
        // Emit login success event
        this.loginSuccess.emit();

        // Navigate to dashboard
        this.router.navigate(['/dashboard']);
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Invalid username or password. Please try again.';
        this.isLoading = false;
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onForgotPassword() {
    // Implement forgot password functionality
    console.log('Forgot password clicked');
  }

  onDemoLogin(role: string) {
    switch (role) {
      case 'admin':
        this.loginData.username = 'admin';
        this.loginData.password = 'password';
        break;
      case 'hr':
        this.loginData.username = 'hr';
        this.loginData.password = 'password';
        break;
      case 'manager':
        this.loginData.username = 'manager';
        this.loginData.password = 'password';
        break;
      case 'employee':
        this.loginData.username = 'employee';
        this.loginData.password = 'password';
        break;
      default:
        this.loginData.username = 'admin';
        this.loginData.password = 'password';
    }
    this.onLogin();
  }
} 