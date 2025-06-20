import { Component, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
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
  @Output() sidebarCollapse = new EventEmitter<boolean>();
  @Output() stateChange = new EventEmitter<{isOpen: boolean; isCollapsed: boolean}>();

  menuItems: MenuItem[] = [];
  currentUser$ = this.authService.currentUser$;
  expandedItems: Set<string> = new Set();
  isMobile = window.innerWidth <= 768;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    const wasNotMobile = !this.isMobile;
    this.isMobile = window.innerWidth <= 768;
    
    if (wasNotMobile && this.isMobile) {
      this.isOpen = false;
      this.emitStateChange();
    } else if (!wasNotMobile && !this.isMobile) {
      this.isOpen = true;
      this.isCollapsed = false;
      this.emitStateChange();
    }
  }

  ngOnInit() {
    this.updateMenuItems();
    this.isOpen = !this.isMobile;
    this.isCollapsed = false;
    this.emitStateChange();
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
        roles: [UserRole.ADMIN],
        children: [
          {
            name: 'User Management',
            icon: 'manage_accounts',
            path: '/system-administration/user-management',
            roles: [UserRole.ADMIN]
          },
          {
            name: 'Role Management',
            icon: 'security',
            path: '/system-administration/role-management',
            roles: [UserRole.ADMIN]
          },
          {
            name: 'Audit Trail',
            icon: 'history',
            path: '/system-administration/audit-trail',
            roles: [UserRole.ADMIN]
          },
          {
            name: 'System Parameters',
            icon: 'settings',
            path: '/system-administration/system-parameters',
            roles: [UserRole.ADMIN]
          }
        ]
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
          },
          {
            name: 'Admin Custom',
            icon: 'build',
            path: '/personnel-information-management/admin-custom',
            roles: [UserRole.ADMIN]
          },
          {
            name: 'Admin Request',
            icon: 'build',
            path: '/personnel-information-management/admin-request',
            roles: [UserRole.ADMIN]
          }
        ]
      },
      {
        name: 'Employee Self-Service',
        icon: 'person',
        path: '/employee-self-service',
        badge: '3',
        roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE],
        children: [
          {
            name: 'My Profile',
            icon: 'person',
            path: '/employee-self-service/my-profile',
            roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE]
          },
          {
            name: 'My Requests',
            icon: 'request_page',
            path: '/employee-self-service/my-requests',
            roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE]
          },
          {
            name: 'My Reports',
            icon: 'report',
            path: '/employee-self-service/my-reports',
            roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE]
          }
        ]
      },
      {
        name: 'Timekeeping & Attendance',
        icon: 'schedule',
        path: '/timekeeping-attendance',
        roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER],
        children: [
          {
            name: 'Attendance Overview',
            icon: 'analytics',
            path: '/timekeeping-attendance/attendance-overview',
            roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER]
          },
          {
            name: 'Attendance Logs',
            icon: 'history',
            path: '/timekeeping-attendance/attendance-logs',
            roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER]
          },
          {
            name: 'Time Schedules',
            icon: 'schedule',
            path: '/timekeeping-attendance/time-schedules',
            roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER]
          },
          {
            name: 'DTR Adjustment',
            icon: 'adjust',
            path: '/timekeeping-attendance/dtr-adjustment',
            roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER]
          },
          {
            name: 'Employee Attendance',
            icon: 'person',
            path: '/timekeeping-attendance/employee-attendance',
            roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER]
          }
        ]
      },
      {
        name: 'Payroll Management',
        icon: 'payments',
        path: '/payroll-management',
        badge: '1',
        roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF],
        children: [
          {
            name: 'Payroll Overview',
            icon: 'analytics',
            path: '/payroll-management/payroll-overview',
            roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF]
          },
          {
            name: 'Master Payroll',
            icon: 'payments',
            path: '/payroll-management/master-payroll',
            roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF]
          },
          {
            name: 'Deductions',
            icon: 'payments',
            path: '/payroll-management/deductions',
            roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF]
          }
        ]
      },
      {
        name: 'Leave Management',
        icon: 'event',
        path: '/leave-management',
        badge: '5',
        roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE],
        children: [
          {
            name: 'Leave Request Management',
            icon: 'event',
            path: '/leave-management/leave-request-management',
            roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE]
          },
          {
            name: 'Leave Type Management',
            icon: 'event',
            path: '/leave-management/leave-type-management',
            roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE]
          },
          {
            name: 'Leave Balance',
            icon: 'event',
            path: '/leave-management/leave-balance',
            roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE]
          }
        ]
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

  toggleSidebar() {
    if (this.isMobile) {
      this.isOpen = !this.isOpen;
      this.sidebarToggle.emit();
    } else {
      this.isCollapsed = !this.isCollapsed;
      this.sidebarCollapse.emit(this.isCollapsed);
    }
    this.emitStateChange();
  }

  private emitStateChange() {
    this.stateChange.emit({
      isOpen: this.isOpen,
      isCollapsed: this.isCollapsed
    });
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
    if (this.isMobile) {
      this.isOpen = false;
      this.sidebarToggle.emit();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 