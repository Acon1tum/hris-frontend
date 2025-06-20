import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @HostBinding('class.sidebar-open') isSidebarOpen = false;
  @Input() isSidebarCollapsed = false;
  
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
  searchText = '';
  isOnline = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

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

  clearSearch() {
    this.searchText = '';
  }

  onSearchInput() {
    // Optionally, implement search logic here
  }
} 