import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleGuard } from './guards/role.guard';
import { UserRole } from './services/auth.service';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE] }
  },
  {
    path: 'system-administration',
    loadComponent: () => import('./features/system-administration/index.component').then(m => m.SystemAdministrationComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN] }
  },
  {
    path: 'system-administration/user-management',
    loadComponent: () => import('./features/system-administration/user-management/user-management.component').then(m => m.UserManagementComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN] }
  },
  {
    path: 'system-administration/role-management',
    loadComponent: () => import('./features/system-administration/role-management/role-management.component').then(m => m.RoleManagementComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN] }
  },
  {
    path: 'system-administration/audit-trail',
    loadComponent: () => import('./features/system-administration/audit-trail/audit-trail.component').then(m => m.AuditTrailComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN] }
  },
  {
    path: 'system-administration/system-parameters',
    loadComponent: () => import('./features/system-administration/system-parameters/system-parameters.component').then(m => m.SystemParametersComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN] }
  },
  {
    path: 'personnel-information-management',
    loadComponent: () => import('./features/personnel-information-management/index.component').then(m => m.PersonnelInformationManagementComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF] }
  },
  {
    path: 'personnel-information-management/admin-dashboard',
    loadComponent: () => import('./features/personnel-information-management/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER] }
  },
  {
    path: 'personnel-information-management/admin-custom',
    loadComponent: () => import('./features/personnel-information-management/admin-custom/admin-custom.component').then(m => m.AdminCustomComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN] }
  },
  {
    path: 'personnel-information-management/admin-request',
    loadComponent: () => import('./features/personnel-information-management/admin-request/admin-request.component').then(m => m.AdminRequestComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN] }
  },
  {
    path: 'employee-self-service',
    loadComponent: () => import('./features/employee-self-service/index.component').then(m => m.EmployeeSelfServiceComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE] }
  },
  {
    path: 'employee-self-service/my-profile',
    loadComponent: () => import('./features/employee-self-service/my-profile/my-profile.component').then(m => m.MyProfileComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE] }
  },
  {
    path: 'employee-self-service/my-requests',
    loadComponent: () => import('./features/employee-self-service/my-requests/my-requests.component').then(m => m.MyRequestsComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE] }
  },
  {
    path: 'employee-self-service/my-reports',
    loadComponent: () => import('./features/employee-self-service/my-reports/my-reports.component').then(m => m.MyReportsComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE] }
  },
  {
    path: 'timekeeping-attendance',
    loadComponent: () => import('./features/timekeeping-attendance/index.component').then(m => m.TimekeepingAttendanceComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER] }
  },
  {
    path: 'timekeeping-attendance/attendance-overview',
    loadComponent: () => import('./features/timekeeping-attendance/attendance-overview/attendance-overview.component').then(m => m.AttendanceOverviewComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER] }
  },
  {
    path: 'timekeeping-attendance/attendance-logs',
    loadComponent: () => import('./features/timekeeping-attendance/attendance-logs/attendance-logs.component').then(m => m.AttendanceLogsComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER] }
  },
  {
    path: 'timekeeping-attendance/time-schedules',
    loadComponent: () => import('./features/timekeeping-attendance/time-schedules/time-schedules.component').then(m => m.TimeSchedulesComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER] }
  },
  {
    path: 'timekeeping-attendance/dtr-adjustment',
    loadComponent: () => import('./features/timekeeping-attendance/dtr-adjustment/dtr-adjustment.component').then(m => m.DtrAdjustmentComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER] }
  },
  {
    path: 'timekeeping-attendance/employee-attendance',
    loadComponent: () => import('./features/timekeeping-attendance/employee-attendance/employee-attendance.component').then(m => m.EmployeeAttendanceComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER] }
  },
  {
    path: 'payroll-management',
    loadComponent: () => import('./features/payroll-management/index.component').then(m => m.PayrollManagementComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF] }
  },
  {
    path: 'leave-management',
    loadComponent: () => import('./features/leave-management/index.component').then(m => m.LeaveManagementComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE] }
  },
  {
    path: 'leave-management/leave-request-management',
    loadComponent: () => import('./features/leave-management/leave-request-management/leave-request-management.component').then(m => m.LeaveRequestManagementComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE] }
  },
  {
    path: 'leave-management/leave-type-management',
    loadComponent: () => import('./features/leave-management/leave-type-management/leave-type-management.component').then(m => m.LeaveTypeManagementComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE] }
  },
  {
    path: 'leave-management/leave-balance',
    loadComponent: () => import('./features/leave-management/leave-balance/leave-balance.component').then(m => m.LeaveBalanceComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE] }
  },
  {
    path: 'report-generation',
    loadComponent: () => import('./features/report-generation/index.component').then(m => m.ReportGenerationComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER] }
  },
  {
    path: 'recruitment',
    loadComponent: () => import('./features/recruitment/index.component').then(m => m.RecruitmentComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF] }
  },
  {
    path: 'online-job-application-portal',
    loadComponent: () => import('./features/online-job-application-portal/index.component').then(m => m.OnlineJobApplicationPortalComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.GUEST] }
  },
  {
    path: 'performance-management',
    loadComponent: () => import('./features/performance-management/index.component').then(m => m.PerformanceManagementComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER] }
  },
  {
    path: 'learning-development',
    loadComponent: () => import('./features/learning-development/index.component').then(m => m.LearningDevelopmentComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE] }
  },
  {
    path: 'health-wellness',
    loadComponent: () => import('./features/health-wellness/index.component').then(m => m.HealthWellnessComponent),
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.HR_STAFF, UserRole.MANAGER, UserRole.EMPLOYEE] }
  },
  { path: '**', redirectTo: '/login' }
]; 