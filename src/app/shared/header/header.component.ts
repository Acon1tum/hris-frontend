import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface Notification {
  id: string;
  message: string;
  time: string;
  type: 'success' | 'warning' | 'info';
}

interface User {
  name: string;
  role: string;
  avatar?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  
  title = 'Quanby HRIS';
  currentUser$ = this.authService.currentUser$;
  
  userMenuItems = [
    { name: 'Profile', icon: 'person', action: 'profile' },
    { name: 'Settings', icon: 'settings', action: 'settings' },
    { name: 'Logout', icon: 'logout', action: 'logout' }
  ];

  notifications: Notification[] = [
    { id: '1', message: 'New leave request pending', time: '2 min ago', type: 'info' },
    { id: '2', message: 'Payroll processed successfully', time: '1 hour ago', type: 'success' },
    { id: '3', message: 'System maintenance scheduled', time: '3 hours ago', type: 'warning' }
  ];

  showUserMenu = false;
  showNotifications = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
    this.showNotifications = false;
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    this.showUserMenu = false;
  }

  clearAllNotifications() {
    this.notifications = [];
    this.showNotifications = false;
  }

  removeNotification(id: string) {
    this.notifications = this.notifications.filter(notification => notification.id !== id);
  }

  onUserAction(action: string) {
    console.log('User action:', action);
    this.showUserMenu = false;
    
    if (action === 'logout') {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  onNotificationClick(notification: Notification) {
    console.log('Notification clicked:', notification);
    this.showNotifications = false;
  }
} 