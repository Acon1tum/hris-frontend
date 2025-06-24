import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplateManagementComponent } from './template-management/template-management.component';
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
import { ScheduledReportsComponent } from './scheduled-reports/scheduled-reports.component';
import { SensitiveReportsComponent } from './sensitive-reports/sensitive-reports.component';

interface ReportFeature {
  name: string;
  description: string;
  icon: string;
  type: ReportType;
}

interface DashboardMetric {
  label: string;
  value: number;
  trend: number;
  icon: string;
}

interface ModuleActivity {
  module: string;
  activeUsers: number;
  lastActivity: Date;
  status: 'active' | 'inactive' | 'maintenance';
}

interface DepartmentMetric {
  name: string;
  employeeCount: number;
  activeRequests: number;
  completionRate: number;
}

interface RoleDistribution {
  role: string;
  count: number;
  percentage: number;
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  department: string;
  lastModified: Date;
  status: 'active' | 'draft' | 'archived';
  type: ReportType;
  layout: {
    sections: string[];
    fields: string[];
    styling: {
      headerColor: string;
      fontFamily: string;
      fontSize: string;
    };
  };
}

interface GlobalLayout {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  lastModified: Date;
  config: {
    headerStyle: string;
    footerStyle: string;
    pageSize: string;
    margins: string;
    fontFamily: string;
    colorScheme: string[];
  };
}

interface AuditTrail {
  id: string;
  reportName: string;
  reportType: ReportType;
  generatedBy: string;
  generatedAt: Date;
  department: string;
  action: 'generated' | 'exported' | 'printed' | 'deleted' | 'modified';
  fileSize?: string;
  downloadCount: number;
  status: 'success' | 'failed' | 'pending';
  ipAddress: string;
  userAgent: string;
  filters?: string[];
  templateUsed?: string;
}

interface ScheduledReport {
  id: string;
  name: string;
  description: string;
  reportType: ReportType;
  department: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom';
  schedule: {
    dayOfWeek?: number; // 0-6 for weekly
    dayOfMonth?: number; // 1-31 for monthly
    hour: number; // 0-23
    minute: number; // 0-59
    timezone: string;
    customCron?: string;
  };
  recipients: string[];
  format: 'pdf' | 'excel' | 'csv' | 'html';
  template?: string;
  filters?: string[];
  status: 'active' | 'paused' | 'draft';
  lastRun?: Date;
  nextRun: Date;
  createdBy: string;
  createdAt: Date;
  autoDelete: boolean;
  retentionDays: number;
}

interface AlertTrigger {
  id: string;
  name: string;
  description: string;
  type: 'data_missing' | 'threshold_exceeded' | 'anomaly_detected' | 'compliance_breach';
  severity: 'low' | 'medium' | 'high' | 'critical';
  conditions: {
    field: string;
    operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'missing' | 'empty';
    value?: any;
    threshold?: number;
  }[];
  scope: 'global' | 'department' | 'role' | 'individual';
  targetDepartment?: string;
  targetRole?: string;
  targetUser?: string;
  notificationChannels: ('email' | 'sms' | 'in_app' | 'webhook')[];
  recipients: string[];
  status: 'active' | 'inactive' | 'draft';
  lastTriggered?: Date;
  triggerCount: number;
  createdBy: string;
  createdAt: Date;
  cooldownMinutes: number;
  autoResolve: boolean;
  resolveConditions?: string[];
}

interface SensitiveReport {
  id: string;
  name: string;
  description: string;
  reportType: ReportType;
  sensitivityLevel: 'low' | 'medium' | 'high' | 'critical';
  category: 'payroll' | 'performance' | 'personal' | 'financial' | 'compliance' | 'audit';
  dataFields: string[];
  retentionPolicy: string;
  encryptionRequired: boolean;
  watermarkEnabled: boolean;
  accessLogging: boolean;
  createdBy: string;
  createdAt: Date;
  lastModified: Date;
  status: 'active' | 'archived' | 'draft';
}

interface RoleAccess {
  id: string;
  roleName: string;
  roleDescription: string;
  permissions: {
    view: boolean;
    generate: boolean;
    export: boolean;
    print: boolean;
    schedule: boolean;
    share: boolean;
    delete: boolean;
  };
  restrictions: {
    timeRestrictions?: string;
    ipRestrictions?: string[];
    deviceRestrictions?: string[];
    dataMasking?: string[];
  };
  assignedReports: string[];
  assignedBy: string;
  assignedAt: Date;
  expiresAt?: Date;
  status: 'active' | 'expired' | 'revoked';
}

interface AccessRequest {
  id: string;
  requester: string;
  requesterRole: string;
  requesterDepartment: string;
  reportId: string;
  reportName: string;
  requestedPermissions: string[];
  reason: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  requestedAt: Date;
  status: 'pending' | 'approved' | 'denied' | 'expired';
  reviewedBy?: string;
  reviewedAt?: Date;
  reviewNotes?: string;
  expiresAt?: Date;
}

enum ReportType {
  EMPLOYEE = 'employee',
  PAYROLL = 'payroll',
  ATTENDANCE = 'attendance',
  LEAVE = 'leave',
  PERFORMANCE = 'performance',
  CUSTOM = 'custom'
}

@Component({
  selector: 'app-report-generation',
  standalone: true,
  imports: [CommonModule, FormsModule, TemplateManagementComponent, AuditTrailComponent, ScheduledReportsComponent, SensitiveReportsComponent],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class ReportGenerationComponent implements OnInit {
  title = 'Report Generation';
  currentView: 'main' | 'templates' | 'audit-trail' | 'scheduled-reports' | 'sensitive-reports' | ReportType = 'main';
  
  // Dashboard Metrics
  keyMetrics: DashboardMetric[] = [
    { label: 'Total Employees', value: 1250, trend: 5.2, icon: 'fas fa-users' },
    { label: 'Active Requests', value: 48, trend: -2.1, icon: 'fas fa-tasks' },
    { label: 'Pending Approvals', value: 15, trend: 0, icon: 'fas fa-clock' },
    { label: 'System Uptime', value: 99.9, trend: 0.1, icon: 'fas fa-server' }
  ];

  moduleActivities: (ModuleActivity & { icon: string })[] = [
    { module: 'Employee Management', activeUsers: 45, lastActivity: new Date(), status: 'active', icon: 'fas fa-id-badge' },
    { module: 'Payroll', activeUsers: 12, lastActivity: new Date(), status: 'active', icon: 'fas fa-money-check-alt' },
    { module: 'Attendance', activeUsers: 89, lastActivity: new Date(), status: 'active', icon: 'fas fa-calendar-check' },
    { module: 'Leave Management', activeUsers: 34, lastActivity: new Date(), status: 'active', icon: 'fas fa-calendar-alt' },
    { module: 'Performance', activeUsers: 23, lastActivity: new Date(), status: 'maintenance', icon: 'fas fa-chart-line' }
  ];

  departmentMetrics: (DepartmentMetric & { icon: string })[] = [
    { name: 'Human Resources', employeeCount: 25, activeRequests: 12, completionRate: 87.5, icon: 'fas fa-user-friends' },
    { name: 'IT Department', employeeCount: 45, activeRequests: 8, completionRate: 92.3, icon: 'fas fa-laptop-code' },
    { name: 'Finance', employeeCount: 30, activeRequests: 15, completionRate: 78.9, icon: 'fas fa-coins' },
    { name: 'Operations', employeeCount: 150, activeRequests: 25, completionRate: 85.2, icon: 'fas fa-cogs' }
  ];

  roleDistribution: (RoleDistribution & { icon: string })[] = [
    { role: 'Employee', count: 980, percentage: 78.4, icon: 'fas fa-user' },
    { role: 'Manager', count: 145, percentage: 11.6, icon: 'fas fa-user-tie' },
    { role: 'HR Staff', count: 85, percentage: 6.8, icon: 'fas fa-user-cog' },
    { role: 'Admin', count: 40, percentage: 3.2, icon: 'fas fa-user-shield' }
  ];

  // Report Templates
  reportTemplates: ReportTemplate[] = [
    {
      id: '1',
      name: 'Monthly Employee Summary',
      description: 'Comprehensive monthly employee status report',
      department: 'Human Resources',
      lastModified: new Date(),
      status: 'active',
      type: ReportType.EMPLOYEE,
      layout: {
        sections: ['Personal Info', 'Attendance', 'Performance'],
        fields: ['Employee ID', 'Name', 'Department', 'Position'],
        styling: {
          headerColor: '#0066ff',
          fontFamily: 'Arial',
          fontSize: '12pt'
        }
      }
    },
    {
      id: '2',
      name: 'Payroll Analysis Template',
      description: 'Detailed payroll analysis with trends',
      department: 'Finance',
      lastModified: new Date(),
      status: 'active',
      type: ReportType.PAYROLL,
      layout: {
        sections: ['Salary', 'Deductions', 'Net Pay'],
        fields: ['Employee ID', 'Basic Pay', 'Allowances', 'Deductions'],
        styling: {
          headerColor: '#00875A',
          fontFamily: 'Calibri',
          fontSize: '11pt'
        }
      }
    },
    {
      id: '3',
      name: 'Department Performance Review',
      description: 'Quarterly department performance template',
      department: 'All',
      lastModified: new Date(),
      status: 'draft',
      type: ReportType.PERFORMANCE,
      layout: {
        sections: ['Goals', 'Achievements', 'Areas for Improvement'],
        fields: ['Department', 'KPIs', 'Achievement Rate', 'Comments'],
        styling: {
          headerColor: '#6554C0',
          fontFamily: 'Roboto',
          fontSize: '12pt'
        }
      }
    }
  ];

  // Global Layouts
  globalLayouts: GlobalLayout[] = [
    {
      id: '1',
      name: 'Corporate Standard',
      description: 'Official corporate report layout',
      isDefault: true,
      lastModified: new Date(),
      config: {
        headerStyle: 'Logo + Department Name',
        footerStyle: 'Page Number + Date',
        pageSize: 'A4',
        margins: '2.5cm',
        fontFamily: 'Arial',
        colorScheme: ['#0066ff', '#00875A', '#6554C0']
      }
    },
    {
      id: '2',
      name: 'Executive Summary',
      description: 'Condensed layout for executive reports',
      isDefault: false,
      lastModified: new Date(),
      config: {
        headerStyle: 'Minimal Header',
        footerStyle: 'Company Info',
        pageSize: 'Letter',
        margins: '2cm',
        fontFamily: 'Calibri',
        colorScheme: ['#1F2937', '#4B5563', '#9CA3AF']
      }
    }
  ];

  reportFeatures: ReportFeature[] = [
    { name: 'Employee Reports', description: 'Generate comprehensive employee reports', icon: '👥', type: ReportType.EMPLOYEE },
    { name: 'Payroll Reports', description: 'Salary and compensation analytics', icon: '💰', type: ReportType.PAYROLL },
    { name: 'Attendance Reports', description: 'Time and attendance analytics', icon: '⏰', type: ReportType.ATTENDANCE },
    { name: 'Leave Reports', description: 'Leave utilization and trends', icon: '📅', type: ReportType.LEAVE },
    { name: 'Performance Reports', description: 'Employee performance analytics', icon: '📈', type: ReportType.PERFORMANCE },
    { name: 'Custom Reports', description: 'Create custom reports and dashboards', icon: '🔧', type: ReportType.CUSTOM }
  ];

  selectedFeature: ReportFeature | null = null;
  cardStates: { [key: string]: 'normal' | 'hovered' } = {};
  showTemplateModal = false;
  showLayoutModal = false;
  selectedTemplate: ReportTemplate | null = null;
  selectedLayout: GlobalLayout | null = null;

  // Audit Trail Data
  auditTrails: AuditTrail[] = [
    {
      id: '1',
      reportName: 'Monthly Employee Summary',
      reportType: ReportType.EMPLOYEE,
      generatedBy: 'john.doe@company.com',
      generatedAt: new Date(),
      department: 'Human Resources',
      action: 'generated',
      fileSize: '2.5 MB',
      downloadCount: 3,
      status: 'success',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/120.0.0.0',
      filters: ['Department: HR', 'Status: Active'],
      templateUsed: 'Monthly Employee Summary'
    },
    {
      id: '2',
      reportName: 'Payroll Analysis Q4',
      reportType: ReportType.PAYROLL,
      generatedBy: 'sarah.smith@company.com',
      generatedAt: new Date(Date.now() - 86400000), // 1 day ago
      department: 'Finance',
      action: 'exported',
      fileSize: '1.8 MB',
      downloadCount: 5,
      status: 'success',
      ipAddress: '192.168.1.101',
      userAgent: 'Firefox/119.0.0.0',
      filters: ['Pay Period: Q4 2024'],
      templateUsed: 'Payroll Analysis Template'
    },
    {
      id: '3',
      reportName: 'Attendance Report',
      reportType: ReportType.ATTENDANCE,
      generatedBy: 'mike.johnson@company.com',
      generatedAt: new Date(Date.now() - 172800000), // 2 days ago
      department: 'Operations',
      action: 'printed',
      fileSize: '950 KB',
      downloadCount: 1,
      status: 'success',
      ipAddress: '192.168.1.102',
      userAgent: 'Safari/17.0.0.0',
      filters: ['Date Range: Last Month'],
      templateUsed: 'Standard Attendance'
    },
    {
      id: '4',
      reportName: 'Performance Review',
      reportType: ReportType.PERFORMANCE,
      generatedBy: 'lisa.wang@company.com',
      generatedAt: new Date(Date.now() - 259200000), // 3 days ago
      department: 'Human Resources',
      action: 'modified',
      fileSize: '3.2 MB',
      downloadCount: 2,
      status: 'success',
      ipAddress: '192.168.1.103',
      userAgent: 'Edge/120.0.0.0',
      filters: ['Review Period: Q4', 'Department: All'],
      templateUsed: 'Department Performance Review'
    },
    {
      id: '5',
      reportName: 'Leave Utilization Report',
      reportType: ReportType.LEAVE,
      generatedBy: 'admin@company.com',
      generatedAt: new Date(Date.now() - 345600000), // 4 days ago
      department: 'All',
      action: 'deleted',
      fileSize: '1.1 MB',
      downloadCount: 0,
      status: 'success',
      ipAddress: '192.168.1.104',
      userAgent: 'Chrome/120.0.0.0',
      filters: ['Leave Type: All', 'Year: 2024'],
      templateUsed: 'Leave Report Template'
    }
  ];

  // Audit Trail Filters
  auditFilters = {
    dateRange: '',
    department: '',
    action: '',
    status: '',
    reportType: ''
  };

  // Scheduled Reports Data
  scheduledReports: ScheduledReport[] = [
    {
      id: '1',
      name: 'Daily Employee Attendance Summary',
      description: 'Daily summary of employee attendance and late arrivals',
      reportType: ReportType.ATTENDANCE,
      department: 'Human Resources',
      frequency: 'daily',
      schedule: {
        hour: 8,
        minute: 0,
        timezone: 'Asia/Manila'
      },
      recipients: ['hr@company.com', 'managers@company.com'],
      format: 'pdf',
      template: 'Daily Attendance Template',
      filters: ['Status: Active', 'Department: All'],
      status: 'active',
      lastRun: new Date(Date.now() - 86400000),
      nextRun: new Date(Date.now() + 86400000),
      createdBy: 'admin@company.com',
      createdAt: new Date(),
      autoDelete: true,
      retentionDays: 30
    },
    {
      id: '2',
      name: 'Weekly Payroll Summary',
      description: 'Weekly payroll summary for finance review',
      reportType: ReportType.PAYROLL,
      department: 'Finance',
      frequency: 'weekly',
      schedule: {
        dayOfWeek: 5, // Friday
        hour: 17,
        minute: 0,
        timezone: 'Asia/Manila'
      },
      recipients: ['finance@company.com', 'payroll@company.com'],
      format: 'excel',
      template: 'Weekly Payroll Template',
      filters: ['Pay Period: Current Week'],
      status: 'active',
      lastRun: new Date(Date.now() - 604800000),
      nextRun: new Date(Date.now() + 604800000),
      createdBy: 'admin@company.com',
      createdAt: new Date(),
      autoDelete: true,
      retentionDays: 90
    },
    {
      id: '3',
      name: 'Monthly Performance Review',
      description: 'Monthly performance metrics and KPIs',
      reportType: ReportType.PERFORMANCE,
      department: 'All',
      frequency: 'monthly',
      schedule: {
        dayOfMonth: 1,
        hour: 9,
        minute: 0,
        timezone: 'Asia/Manila'
      },
      recipients: ['executives@company.com', 'hr@company.com'],
      format: 'pdf',
      template: 'Monthly Performance Template',
      filters: ['Review Period: Last Month'],
      status: 'paused',
      lastRun: new Date(Date.now() - 2592000000),
      nextRun: new Date(Date.now() + 2592000000),
      createdBy: 'admin@company.com',
      createdAt: new Date(),
      autoDelete: false,
      retentionDays: 365
    }
  ];

  // Alert Triggers Data
  alertTriggers: AlertTrigger[] = [
    {
      id: '1',
      name: 'Missing Employee Data Alert',
      description: 'Alert when employee records are missing required fields',
      type: 'data_missing',
      severity: 'high',
      conditions: [
        {
          field: 'employee_data_completeness',
          operator: 'less_than',
          threshold: 95
        },
        {
          field: 'required_fields',
          operator: 'missing',
          value: ['emergency_contact', 'bank_details', 'tax_info']
        }
      ],
      scope: 'global',
      notificationChannels: ['email', 'in_app'],
      recipients: ['hr@company.com', 'admin@company.com'],
      status: 'active',
      lastTriggered: new Date(Date.now() - 3600000),
      triggerCount: 12,
      createdBy: 'admin@company.com',
      createdAt: new Date(),
      cooldownMinutes: 60,
      autoResolve: true,
      resolveConditions: ['data_completeness >= 95']
    },
    {
      id: '2',
      name: 'Attendance Anomaly Detection',
      description: 'Detect unusual attendance patterns',
      type: 'anomaly_detected',
      severity: 'medium',
      conditions: [
        {
          field: 'late_arrivals',
          operator: 'greater_than',
          threshold: 20
        },
        {
          field: 'absent_days',
          operator: 'greater_than',
          threshold: 3
        }
      ],
      scope: 'department',
      targetDepartment: 'Operations',
      notificationChannels: ['email', 'sms'],
      recipients: ['operations@company.com', 'hr@company.com'],
      status: 'active',
      lastTriggered: new Date(Date.now() - 7200000),
      triggerCount: 5,
      createdBy: 'admin@company.com',
      createdAt: new Date(),
      cooldownMinutes: 120,
      autoResolve: false
    },
    {
      id: '3',
      name: 'Payroll Compliance Alert',
      description: 'Monitor payroll compliance and tax deadlines',
      type: 'compliance_breach',
      severity: 'critical',
      conditions: [
        {
          field: 'tax_filing_deadline',
          operator: 'less_than',
          threshold: 7
        },
        {
          field: 'payroll_accuracy',
          operator: 'less_than',
          threshold: 99.5
        }
      ],
      scope: 'department',
      targetDepartment: 'Finance',
      notificationChannels: ['email', 'sms', 'webhook'],
      recipients: ['finance@company.com', 'compliance@company.com'],
      status: 'active',
      lastTriggered: new Date(Date.now() - 86400000),
      triggerCount: 2,
      createdBy: 'admin@company.com',
      createdAt: new Date(),
      cooldownMinutes: 30,
      autoResolve: false
    }
  ];

  // Modal States
  showScheduledReportModal = false;
  showAlertTriggerModal = false;
  selectedScheduledReport: ScheduledReport | null = null;
  selectedAlertTrigger: AlertTrigger | null = null;

  // RBAC Data
  sensitiveReports: SensitiveReport[] = [
    {
      id: '1',
      name: 'Executive Compensation Report',
      description: 'Detailed compensation analysis for C-level executives',
      reportType: ReportType.PAYROLL,
      sensitivityLevel: 'critical',
      category: 'payroll',
      dataFields: ['salary', 'bonus', 'stock_options', 'benefits', 'tax_info'],
      retentionPolicy: '7 years',
      encryptionRequired: true,
      watermarkEnabled: true,
      accessLogging: true,
      createdBy: 'admin@company.com',
      createdAt: new Date(),
      lastModified: new Date(),
      status: 'active'
    },
    {
      id: '2',
      name: 'Employee Performance Evaluations',
      description: 'Comprehensive performance reviews and ratings',
      reportType: ReportType.PERFORMANCE,
      sensitivityLevel: 'high',
      category: 'performance',
      dataFields: ['performance_rating', 'goals', 'feedback', 'improvement_areas'],
      retentionPolicy: '3 years',
      encryptionRequired: true,
      watermarkEnabled: true,
      accessLogging: true,
      createdBy: 'admin@company.com',
      createdAt: new Date(),
      lastModified: new Date(),
      status: 'active'
    },
    {
      id: '3',
      name: 'Financial Compliance Audit',
      description: 'Internal audit reports for financial compliance',
      reportType: ReportType.CUSTOM,
      sensitivityLevel: 'high',
      category: 'compliance',
      dataFields: ['audit_findings', 'compliance_status', 'risk_assessment', 'recommendations'],
      retentionPolicy: '10 years',
      encryptionRequired: true,
      watermarkEnabled: true,
      accessLogging: true,
      createdBy: 'admin@company.com',
      createdAt: new Date(),
      lastModified: new Date(),
      status: 'active'
    },
    {
      id: '4',
      name: 'Employee Personal Data Export',
      description: 'Complete employee personal information export',
      reportType: ReportType.EMPLOYEE,
      sensitivityLevel: 'critical',
      category: 'personal',
      dataFields: ['ssn', 'address', 'phone', 'emergency_contact', 'medical_info'],
      retentionPolicy: '1 year',
      encryptionRequired: true,
      watermarkEnabled: true,
      accessLogging: true,
      createdBy: 'admin@company.com',
      createdAt: new Date(),
      lastModified: new Date(),
      status: 'active'
    }
  ];

  roleAccess: RoleAccess[] = [
    {
      id: '1',
      roleName: 'HR Manager',
      roleDescription: 'Human Resources department managers',
      permissions: {
        view: true,
        generate: true,
        export: true,
        print: true,
        schedule: true,
        share: false,
        delete: false
      },
      restrictions: {
        timeRestrictions: 'Business hours only',
        ipRestrictions: ['192.168.1.0/24'],
        dataMasking: ['ssn', 'salary']
      },
      assignedReports: ['2', '4'],
      assignedBy: 'admin@company.com',
      assignedAt: new Date(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      status: 'active'
    },
    {
      id: '2',
      roleName: 'Finance Director',
      roleDescription: 'Finance department directors',
      permissions: {
        view: true,
        generate: true,
        export: true,
        print: true,
        schedule: true,
        share: false,
        delete: false
      },
      restrictions: {
        timeRestrictions: 'Business hours only',
        ipRestrictions: ['192.168.2.0/24'],
        dataMasking: ['ssn']
      },
      assignedReports: ['1', '3'],
      assignedBy: 'admin@company.com',
      assignedAt: new Date(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      status: 'active'
    },
    {
      id: '3',
      roleName: 'Department Head',
      roleDescription: 'Department heads and supervisors',
      permissions: {
        view: true,
        generate: false,
        export: false,
        print: true,
        schedule: false,
        share: false,
        delete: false
      },
      restrictions: {
        timeRestrictions: 'Business hours only',
        dataMasking: ['ssn', 'salary', 'bonus']
      },
      assignedReports: ['2'],
      assignedBy: 'admin@company.com',
      assignedAt: new Date(),
      expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      status: 'active'
    }
  ];

  accessRequests: AccessRequest[] = [
    {
      id: '1',
      requester: 'john.manager@company.com',
      requesterRole: 'Department Head',
      requesterDepartment: 'Operations',
      reportId: '2',
      reportName: 'Employee Performance Evaluations',
      requestedPermissions: ['view', 'export'],
      reason: 'Need to review team performance for quarterly planning',
      urgency: 'medium',
      requestedAt: new Date(Date.now() - 86400000),
      status: 'pending'
    },
    {
      id: '2',
      requester: 'sarah.finance@company.com',
      requesterRole: 'Finance Analyst',
      requesterDepartment: 'Finance',
      reportId: '1',
      reportName: 'Executive Compensation Report',
      requestedPermissions: ['view', 'generate'],
      reason: 'Required for annual budget planning and analysis',
      urgency: 'high',
      requestedAt: new Date(Date.now() - 172800000),
      status: 'approved',
      reviewedBy: 'admin@company.com',
      reviewedAt: new Date(Date.now() - 86400000),
      reviewNotes: 'Approved for budget planning purposes',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      requester: 'mike.hr@company.com',
      requesterRole: 'HR Specialist',
      requesterDepartment: 'Human Resources',
      reportId: '4',
      reportName: 'Employee Personal Data Export',
      requestedPermissions: ['view', 'export'],
      reason: 'Required for compliance audit and data verification',
      urgency: 'urgent',
      requestedAt: new Date(Date.now() - 3600000),
      status: 'pending'
    }
  ];

  // RBAC Modal States
  showSensitiveReportModal = false;
  showRoleAccessModal = false;
  showAccessRequestModal = false;
  selectedSensitiveReport: SensitiveReport | null = null;
  selectedRoleAccess: RoleAccess | null = null;
  selectedAccessRequest: AccessRequest | null = null;

  showModulesOverview = false;

  constructor() {
    // Initialize card states
    this.reportFeatures.forEach(feature => {
      this.cardStates[feature.type] = 'normal';
    });
  }

  ngOnInit(): void {
    // Here you would typically fetch real data from your services
  }

  onCardHover(type: ReportType, isHovered: boolean) {
    this.cardStates[type] = isHovered ? 'hovered' : 'normal';
  }

  navigateToReport(feature: ReportFeature) {
    this.selectedFeature = feature;
    this.currentView = feature.type;
  }

  goBack() {
    this.currentView = 'main';
    this.selectedFeature = null;
  }

  // Template Management Methods
  createTemplate() {
    this.showTemplateModal = true;
    this.selectedTemplate = null;
  }

  editTemplate(template: ReportTemplate) {
    this.showTemplateModal = true;
    this.selectedTemplate = template;
  }

  deleteTemplate(templateId: string) {
    // Add confirmation dialog and deletion logic
    this.reportTemplates = this.reportTemplates.filter(t => t.id !== templateId);
  }

  // Layout Management Methods
  createLayout() {
    this.showLayoutModal = true;
    this.selectedLayout = null;
  }

  editLayout(layout: GlobalLayout) {
    this.showLayoutModal = true;
    this.selectedLayout = layout;
  }

  deleteLayout(layoutId: string) {
    // Add confirmation dialog and deletion logic
    this.globalLayouts = this.globalLayouts.filter(l => l.id !== layoutId);
  }

  setDefaultLayout(layoutId: string) {
    this.globalLayouts = this.globalLayouts.map(l => ({
      ...l,
      isDefault: l.id === layoutId
    }));
  }

  // Audit Trail Methods
  deleteAuditTrail(auditId: string) {
    // Add confirmation dialog and deletion logic
    this.auditTrails = this.auditTrails.filter(a => a.id !== auditId);
  }

  exportAuditTrail() {
    // Implementation for exporting audit trail data
    console.log('Exporting audit trail...');
  }

  clearAuditTrail() {
    // Add confirmation dialog and clear all audit trails
    if (confirm('Are you sure you want to clear all audit trails? This action cannot be undone.')) {
      this.auditTrails = [];
    }
  }

  filterAuditTrails() {
    // Implementation for filtering audit trails based on auditFilters
    console.log('Filtering audit trails...', this.auditFilters);
  }

  getActionIcon(action: string): string {
    switch (action) {
      case 'generated': return 'fas fa-file-plus';
      case 'exported': return 'fas fa-download';
      case 'printed': return 'fas fa-print';
      case 'deleted': return 'fas fa-trash';
      case 'modified': return 'fas fa-edit';
      default: return 'fas fa-file';
    }
  }

  getActionColor(action: string): string {
    switch (action) {
      case 'generated': return 'var(--success-color)';
      case 'exported': return 'var(--primary-color)';
      case 'printed': return 'var(--warning-color)';
      case 'deleted': return 'var(--danger-color)';
      case 'modified': return 'var(--secondary-color)';
      default: return 'var(--text-secondary)';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'success': return 'fas fa-check-circle';
      case 'failed': return 'fas fa-times-circle';
      case 'pending': return 'fas fa-clock';
      default: return 'fas fa-question-circle';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active': return 'var(--success-color)';
      case 'inactive': return 'var(--warning-color)';
      case 'maintenance': return 'var(--danger-color)';
      case 'pending': return 'var(--warning-color)';
      case 'approved': return 'var(--success-color)';
      case 'denied': return 'var(--danger-color)';
      case 'expired': return 'var(--text-secondary)';
      case 'revoked': return 'var(--danger-color)';
      default: return 'var(--text-secondary)';
    }
  }

  formatFileSize(bytes: string): string {
    return bytes; // Already formatted in the data
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  }

  getReportContent(): any {
    if (!this.selectedFeature) return null;

    switch (this.selectedFeature.type) {
      case ReportType.EMPLOYEE:
        return {
          fields: ['Employee ID', 'Name', 'Department', 'Position', 'Status'],
          filters: ['Department', 'Status', 'Date Range']
        };
      case ReportType.PAYROLL:
        return {
          fields: ['Employee ID', 'Name', 'Basic Pay', 'Allowances', 'Deductions', 'Net Pay'],
          filters: ['Pay Period', 'Department']
        };
      case ReportType.ATTENDANCE:
        return {
          fields: ['Employee ID', 'Name', 'Date', 'Time In', 'Time Out', 'Status'],
          filters: ['Date Range', 'Department', 'Status']
        };
      case ReportType.LEAVE:
        return {
          fields: ['Employee ID', 'Name', 'Leave Type', 'Start Date', 'End Date', 'Status'],
          filters: ['Leave Type', 'Status', 'Date Range']
        };
      case ReportType.PERFORMANCE:
        return {
          fields: ['Employee ID', 'Name', 'Review Period', 'Rating', 'Comments'],
          filters: ['Review Period', 'Department', 'Rating']
        };
      case ReportType.CUSTOM:
        return {
          fields: ['Select Fields...'],
          filters: ['Add Filters...']
        };
      default:
        return null;
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleString();
  }

  getTrendIcon(trend: number): string {
    if (trend > 0) return 'fas fa-arrow-up text-success';
    if (trend < 0) return 'fas fa-arrow-down text-danger';
    return 'fas fa-minus text-secondary';
  }

  getTemplateStatusColor(status: string): string {
    switch (status) {
      case 'active': return 'var(--success-color)';
      case 'draft': return 'var(--warning-color)';
      case 'archived': return 'var(--text-secondary)';
      default: return 'var(--text-secondary)';
    }
  }

  // Scheduled Report Methods
  createScheduledReport() {
    this.showScheduledReportModal = true;
    this.selectedScheduledReport = null;
  }

  editScheduledReport(report: ScheduledReport) {
    this.showScheduledReportModal = true;
    this.selectedScheduledReport = report;
  }

  deleteScheduledReport(reportId: string) {
    if (confirm('Are you sure you want to delete this scheduled report?')) {
      this.scheduledReports = this.scheduledReports.filter(r => r.id !== reportId);
    }
  }

  toggleScheduledReportStatus(report: ScheduledReport) {
    report.status = report.status === 'active' ? 'paused' : 'active';
  }

  runScheduledReportNow(report: ScheduledReport) {
    // Implementation for running report immediately
    console.log('Running scheduled report now:', report.name);
  }

  // Alert Trigger Methods
  createAlertTrigger() {
    this.showAlertTriggerModal = true;
    this.selectedAlertTrigger = null;
  }

  editAlertTrigger(trigger: AlertTrigger) {
    this.showAlertTriggerModal = true;
    this.selectedAlertTrigger = trigger;
  }

  deleteAlertTrigger(triggerId: string) {
    if (confirm('Are you sure you want to delete this alert trigger?')) {
      this.alertTriggers = this.alertTriggers.filter(t => t.id !== triggerId);
    }
  }

  toggleAlertTriggerStatus(trigger: AlertTrigger) {
    trigger.status = trigger.status === 'active' ? 'inactive' : 'active';
  }

  testAlertTrigger(trigger: AlertTrigger) {
    // Implementation for testing alert trigger
    console.log('Testing alert trigger:', trigger.name);
  }

  // Utility Methods
  getFrequencyLabel(frequency: string): string {
    switch (frequency) {
      case 'daily': return 'Daily';
      case 'weekly': return 'Weekly';
      case 'monthly': return 'Monthly';
      case 'quarterly': return 'Quarterly';
      case 'yearly': return 'Yearly';
      case 'custom': return 'Custom';
      default: return frequency;
    }
  }

  getSeverityColor(severity: string): string {
    switch (severity) {
      case 'low': return 'var(--success-color)';
      case 'medium': return 'var(--warning-color)';
      case 'high': return 'var(--danger-color)';
      case 'critical': return '#dc2626';
      default: return 'var(--text-secondary)';
    }
  }

  getAlertTypeIcon(type: string): string {
    switch (type) {
      case 'data_missing': return 'fas fa-exclamation-triangle';
      case 'threshold_exceeded': return 'fas fa-chart-line';
      case 'anomaly_detected': return 'fas fa-radar';
      case 'compliance_breach': return 'fas fa-shield-alt';
      default: return 'fas fa-bell';
    }
  }

  getFormatIcon(format: string): string {
    switch (format) {
      case 'pdf': return 'fas fa-file-pdf';
      case 'excel': return 'fas fa-file-excel';
      case 'csv': return 'fas fa-file-csv';
      case 'html': return 'fas fa-file-code';
      default: return 'fas fa-file';
    }
  }

  getNotificationChannelsText(channels: string[]): string {
    return channels.map(channel => {
      switch (channel) {
        case 'email': return 'Email';
        case 'sms': return 'SMS';
        case 'in_app': return 'In-App';
        case 'webhook': return 'Webhook';
        default: return channel;
      }
    }).join(', ');
  }

  // RBAC Methods
  createSensitiveReport() {
    this.showSensitiveReportModal = true;
    this.selectedSensitiveReport = null;
  }

  editSensitiveReport(report: SensitiveReport) {
    this.showSensitiveReportModal = true;
    this.selectedSensitiveReport = report;
  }

  deleteSensitiveReport(reportId: string) {
    if (confirm('Are you sure you want to delete this sensitive report? This action cannot be undone.')) {
      this.sensitiveReports = this.sensitiveReports.filter(r => r.id !== reportId);
    }
  }

  createRoleAccess() {
    this.showRoleAccessModal = true;
    this.selectedRoleAccess = null;
  }

  editRoleAccess(role: RoleAccess) {
    this.showRoleAccessModal = true;
    this.selectedRoleAccess = role;
  }

  deleteRoleAccess(roleId: string) {
    if (confirm('Are you sure you want to delete this role access configuration?')) {
      this.roleAccess = this.roleAccess.filter(r => r.id !== roleId);
    }
  }

  revokeRoleAccess(role: RoleAccess) {
    role.status = 'revoked';
  }

  approveAccessRequest(request: AccessRequest) {
    request.status = 'approved';
    request.reviewedBy = 'admin@company.com';
    request.reviewedAt = new Date();
    request.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  }

  denyAccessRequest(request: AccessRequest) {
    request.status = 'denied';
    request.reviewedBy = 'admin@company.com';
    request.reviewedAt = new Date();
  }

  viewAccessRequest(request: AccessRequest) {
    this.showAccessRequestModal = true;
    this.selectedAccessRequest = request;
  }

  // Utility Methods for RBAC
  getSensitivityColor(level: string): string {
    switch (level) {
      case 'low': return 'var(--success-color)';
      case 'medium': return 'var(--warning-color)';
      case 'high': return 'var(--danger-color)';
      case 'critical': return '#dc2626';
      default: return 'var(--text-secondary)';
    }
  }

  getSensitivityIcon(level: string): string {
    switch (level) {
      case 'low': return 'fas fa-shield-alt';
      case 'medium': return 'fas fa-shield';
      case 'high': return 'fas fa-lock';
      case 'critical': return 'fas fa-lock';
      default: return 'fas fa-file';
    }
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'payroll': return 'fas fa-dollar-sign';
      case 'performance': return 'fas fa-chart-line';
      case 'personal': return 'fas fa-user-shield';
      case 'financial': return 'fas fa-chart-pie';
      case 'compliance': return 'fas fa-clipboard-check';
      case 'audit': return 'fas fa-search';
      default: return 'fas fa-file';
    }
  }

  getUrgencyColor(urgency: string): string {
    switch (urgency) {
      case 'low': return 'var(--success-color)';
      case 'medium': return 'var(--warning-color)';
      case 'high': return 'var(--danger-color)';
      case 'urgent': return '#dc2626';
      default: return 'var(--text-secondary)';
    }
  }

  getPermissionsText(permissions: any): string {
    const activePermissions = Object.keys(permissions).filter(key => permissions[key]);
    return activePermissions.map(perm => perm.charAt(0).toUpperCase() + perm.slice(1)).join(', ');
  }

  getRestrictionsText(restrictions: any): string {
    const restrictionsList = [];
    if (restrictions.timeRestrictions) restrictionsList.push('Time: ' + restrictions.timeRestrictions);
    if (restrictions.ipRestrictions) restrictionsList.push('IP: ' + restrictions.ipRestrictions.length + ' ranges');
    if (restrictions.dataMasking) restrictionsList.push('Masking: ' + restrictions.dataMasking.length + ' fields');
    return restrictionsList.join(' | ');
  }

  // Navigation Methods
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  }

  openModulesOverview() {
    this.showModulesOverview = true;
  }

  closeModulesOverview() {
    this.showModulesOverview = false;
  }

  // Add method to toggle views
  toggleView(view: 'main' | 'templates' | 'audit-trail' | 'scheduled-reports' | 'sensitive-reports' | ReportType) {
    this.currentView = view;
  }
}