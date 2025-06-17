import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService, UserRole, MenuItem } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() isOpen = false;
  @Input() isCollapsed = false;
  @Output() sidebarToggle = new EventEmitter<void>();

  menuItems: MenuItem[] = [];
  currentUser$ = this.authService.currentUser$;
  expandedItems: Set<string> = new Set();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateMenuItems();
  }

  private updateMenuItems() {
    const allMenuItems: MenuItem[] = [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        path: '/dashboard',
        roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE]
      },
      {
        name: 'System Administration',
        icon: 'admin_panel_settings',
        path: '/system-administration',
        roles: [UserRole.ADMIN]
      },
      {
        name: 'Personnel Information',
        icon: 'people',
        path: '/personnel-information-management',
        roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF],
        children: [
          {
            name: 'Admin Dashboard',
            icon: 'analytics',
            path: '/personnel-information-management/admin-dashboard',
            roles: [UserRole.ADMIN, UserRole.HR_MANAGER]
          }
        ]
      },
      {
        name: 'Employee Self-Service',
        icon: 'person',
        path: '/employee-self-service',
        badge: '3',
        roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE]
      },
      {
        name: 'Timekeeping & Attendance',
        icon: 'schedule',
        path: '/timekeeping-attendance',
        roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER]
      },
      {
        name: 'Payroll Management',
        icon: 'payments',
        path: '/payroll-management',
        badge: '1',
        roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF]
      },
      {
        name: 'Leave Management',
        icon: 'event',
        path: '/leave-management',
        badge: '5',
        roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE]
      },
      {
        name: 'Report Generation',
        icon: 'assessment',
        path: '/report-generation',
        roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER]
      },
      {
        name: 'Recruitment',
        icon: 'work',
        path: '/recruitment',
        badge: '2',
        roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF]
      },
      {
        name: 'Job Portal',
        icon: 'language',
        path: '/online-job-application-portal',
        roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.GUEST]
      },
      {
        name: 'Performance Management',
        icon: 'trending_up',
        path: '/performance-management',
        roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER]
      },
      {
        name: 'Learning & Development',
        icon: 'school',
        path: '/learning-development',
        badge: '4',
        roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE]
      },
      {
        name: 'Health & Wellness',
        icon: 'health_and_safety',
        path: '/health-wellness',
        roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE]
      }
    ];

    // Filter menu items based on user role
    this.menuItems = allMenuItems.filter(item => 
      this.authService.canAccess(item.roles)
    );
  }

  canAccess(roles: UserRole[]): boolean {
    return this.authService.canAccess(roles);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  toggleMenuItem(itemName: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (this.expandedItems.has(itemName)) {
      this.expandedItems.delete(itemName);
    } else {
      this.expandedItems.add(itemName);
    }
  }

  isMenuItemExpanded(itemName: string): boolean {
    return this.expandedItems.has(itemName);
  }

  onMenuItemClick() {
    // Close sidebar on mobile when menu item is clicked
    if (window.innerWidth <= 768) {
      this.toggleSidebar();
    }
  }
} 