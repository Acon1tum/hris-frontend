import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink,
    HeaderComponent, 
    SidebarComponent, 
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hris-frontend';
  isSidebarOpen = true;
  isSidebarCollapsed = false;
  currentUser$ = this.authService.currentUser$;
  
  features = [
    { name: 'System Administration', icon: '⚙️', route: '/system-administration', description: 'Manage system settings and configurations' },
    { name: 'Personnel Information Management', icon: '👥', route: '/personnel-information-management', description: 'Manage employee information and records' },
    { name: 'Employee Self-Service', icon: '👤', route: '/employee-self-service', description: 'Employee portal for self-service functions' },
    { name: 'Timekeeping & Attendance', icon: '⏰', route: '/timekeeping-attendance', description: 'Track employee time and attendance' },
    { name: 'Payroll Management', icon: '💰', route: '/payroll-management', description: 'Manage payroll processing and calculations' },
    { name: 'Leave Management', icon: '📅', route: '/leave-management', description: 'Handle leave requests and approvals' },
    { name: 'Report Generation', icon: '📊', route: '/report-generation', description: 'Generate and view reports' },
    { name: 'Recruitment', icon: '🎯', route: '/recruitment', description: 'Manage recruitment and hiring process' },
    { name: 'Online Job Application Portal', icon: '🌐', route: '/online-job-application-portal', description: 'External job application portal' },
    { name: 'Performance Management', icon: '📈', route: '/performance-management', description: 'Track and manage employee performance' },
    { name: 'Learning & Development', icon: '🎓', route: '/learning-development', description: 'Manage training and development programs' },
    { name: 'Health & Wellness', icon: '🏥', route: '/health-wellness', description: 'Health and wellness programs' }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Authentication status is now managed by the AuthService
  }

  onLoginSuccess() {
    // Login success is handled by the AuthService
  }

  onLogout() {
    this.authService.logout();
  }

  toggleSidebar() {
    // Cycle through states: open -> collapsed -> closed -> open
    if (this.isSidebarOpen && !this.isSidebarCollapsed) {
      // Currently open, collapse it
      this.isSidebarCollapsed = true;
    } else if (this.isSidebarOpen && this.isSidebarCollapsed) {
      // Currently collapsed, close it
      this.isSidebarOpen = false;
      this.isSidebarCollapsed = false;
    } else {
      // Currently closed, open it
      this.isSidebarOpen = true;
      this.isSidebarCollapsed = false;
    }
  }

  isFeaturePage(): boolean {
    const currentUrl = window.location.pathname;
    return currentUrl !== '/' && currentUrl !== '/dashboard' && currentUrl !== '/login';
  }
} 