import { Component, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MenuItem, Permission } from '../../interfaces/auth.interface';

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

    // Update menu items when user changes
    this.currentUser$.subscribe(() => {
      this.updateMenuItems();
    });
  }

  private updateMenuItems() {
    const allMenuItems: MenuItem[] = [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        path: '/dashboard',
        permissions: [] // Dashboard accessible to all authenticated users
      },
      {
        name: 'System Administration',
        icon: 'admin_panel_settings',
        path: '/system-administration',
        permissions: [Permission.user_read, Permission.role_read, Permission.permission_read],
        children: [
          {
            name: 'User Management',
            icon: 'manage_accounts',
            path: '/system-administration/user-management',
            permissions: [Permission.user_read, Permission.user_create, Permission.user_update]
          },
          {
            name: 'Role Management',
            icon: 'security',
            path: '/system-administration/role-management',
            permissions: [Permission.role_read, Permission.role_create, Permission.role_update]
          },
          {
            name: 'Audit Trail',
            icon: 'history',
            path: '/system-administration/audit-trail',
            permissions: [Permission.audit_log_read, Permission.audit_trail_read]
          },
          {
            name: 'System Parameters',
            icon: 'settings',
            path: '/system-administration/system-parameters',
            permissions: [Permission.parameter_read, Permission.config_read]
          }
        ]
      },
      {
        name: 'Personnel Information',
        icon: 'people',
        path: '/personnel-information-management',
        permissions: [Permission.employee_read],
        children: [
          {
            name: 'Admin Dashboard',
            icon: 'analytics',
            path: '/personnel-information-management/admin-dashboard',
            permissions: [Permission.employee_read]
          },
          {
            name: 'Admin Custom',
            icon: 'build',
            path: '/personnel-information-management/admin-custom',
            permissions: [Permission.custom_field_read, Permission.custom_field_create]
          },
          {
            name: 'Admin Request',
            icon: 'build',
            path: '/personnel-information-management/admin-request',
            permissions: [Permission.request_read, Permission.request_update]
          },
          {
            name: 'Personnel 201 File',
            icon: 'build',
            path: '/personnel-information-management/personnel-201-file',
            permissions: [Permission.employee_read, Permission.employment_record_read]
          }
        ]
      },
      {
        name: 'Employee Self-Service',
        icon: 'person',
        path: '/employee-self-service',
        badge: '3',
        permissions: [], // Accessible to all employees
        children: [
          {
            name: 'My Profile',
            icon: 'person',
            path: '/employee-self-service/my-profile',
            permissions: [Permission.employee_read]
          },
          {
            name: 'My Requests',
            icon: 'request_page',
            path: '/employee-self-service/my-requests',
            permissions: [Permission.request_read, Permission.leave_request_read]
          },
          {
            name: 'My Reports',
            icon: 'report',
            path: '/employee-self-service/my-reports',
            permissions: [Permission.report_read]
          }
        ]
      },
      {
        name: 'Timekeeping & Attendance',
        icon: 'schedule',
        path: '/timekeeping-attendance',
        permissions: [Permission.attendance_log_read],
        children: [
          {
            name: 'Attendance Overview',
            icon: 'analytics',
            path: '/timekeeping-attendance/attendance-overview',
            permissions: [Permission.attendance_log_read]
          },
          {
            name: 'Attendance Logs',
            icon: 'history',
            path: '/timekeeping-attendance/attendance-logs',
            permissions: [Permission.attendance_log_read]
          },
          {
            name: 'Time Schedules',
            icon: 'schedule',
            path: '/timekeeping-attendance/time-schedules',
            permissions: [Permission.schedule_read, Permission.schedule_create]
          },
          {
            name: 'DTR Adjustment',
            icon: 'adjust',
            path: '/timekeeping-attendance/dtr-adjustment',
            permissions: [Permission.dtr_adjustment_read, Permission.dtr_adjustment_create]
          },
          {
            name: 'Employee Attendance',
            icon: 'person',
            path: '/timekeeping-attendance/employee-attendance',
            permissions: [Permission.attendance_log_read]
          }
        ]
      },
      {
        name: 'Payroll Management',
        icon: 'payments',
        path: '/payroll-management',
        badge: '1',
        permissions: [Permission.payroll_record_read],
        children: [
          {
            name: 'Payroll Overview',
            icon: 'analytics',
            path: '/payroll-management/payroll-overview',
            permissions: [Permission.payroll_record_read]
          },
          {
            name: 'Master Payroll',
            icon: 'payments',
            path: '/payroll-management/master-payroll',
            permissions: [Permission.payroll_record_read, Permission.payroll_record_create]
          },
          {
            name: 'Deductions',
            icon: 'payments',
            path: '/payroll-management/deductions',
            permissions: [Permission.payroll_record_read, Permission.salary_adjustment_read]
          },
          {
            name: 'Loan Management',
            icon: 'payments',
            path: '/payroll-management/loan-management',
            permissions: [Permission.loan_balance_read, Permission.loan_balance_create]
          },
          {
            name: 'Payroll Adjustment',
            icon: 'payments',
            path: '/payroll-management/payroll-adjustment',
            permissions: [Permission.salary_adjustment_read, Permission.salary_adjustment_create]
          },
          {
            name: 'Payroll Run',
            icon: 'payments',
            path: '/payroll-management/payroll-run',
            permissions: [Permission.payroll_record_create, Permission.payroll_record_update]
          }
        ]
      },
      {
        name: 'Leave Management',
        icon: 'event',
        path: '/leave-management',
        badge: '5',
        permissions: [Permission.leave_request_read, Permission.leave_balance_read],
        children: [
          {
            name: 'Leave Request Management',
            icon: 'event',
            path: '/leave-management/leave-request-management',
            permissions: [Permission.leave_request_read, Permission.leave_request_create]
          },
          {
            name: 'Leave Type Management',
            icon: 'event',
            path: '/leave-management/leave-type-management',
            permissions: [Permission.leave_type_read, Permission.leave_type_create]
          },
          {
            name: 'Leave Balance',
            icon: 'event',
            path: '/leave-management/leave-balance',
            permissions: [Permission.leave_balance_read]
          }
        ]
      },
      {
        name: 'Report Generation',
        icon: 'assessment',
        path: '/report-generation',
        permissions: [Permission.report_read, Permission.report_generate]
      },
      {
        name: 'Recruitment',
        icon: 'work',
        path: '/recruitment',
        badge: '2',
        permissions: [Permission.applicant_read, Permission.job_posting_read]
      },
      {
        name: 'Job Portal',
        icon: 'language',
        path: '/online-job-application-portal',
        permissions: [] // Public access
      },
      {
        name: 'Performance Management',
        icon: 'trending_up',
        path: '/performance-management',
        permissions: [Permission.performance_review_read]
      },
      {
        name: 'Learning & Development',
        icon: 'school',
        path: '/learning-development',
        badge: '4',
        permissions: [Permission.training_program_read, Permission.training_enrollment_read]
      },
      {
        name: 'Health & Wellness',
        icon: 'health_and_safety',
        path: '/health-wellness',
        permissions: [] // Accessible to all employees
      }
    ];

    // Filter menu items based on user permissions
    this.menuItems = this.filterMenuItemsByPermissions(allMenuItems);
  }

  private filterMenuItemsByPermissions(items: MenuItem[]): MenuItem[] {
    return items.filter(item => {
      // Check if user has access to this menu item
      const hasAccess = this.authService.canAccessRoute(item.permissions);
      
      if (hasAccess && item.children) {
        // Filter children based on permissions
        item.children = this.filterMenuItemsByPermissions(item.children);
        // Only show parent if it has accessible children or direct access
        return item.children.length > 0 || item.permissions.length === 0;
      }
      
      return hasAccess;
    });
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