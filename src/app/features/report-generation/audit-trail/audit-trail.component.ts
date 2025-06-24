import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

enum ReportType {
  EMPLOYEE = 'EMPLOYEE',
  PAYROLL = 'PAYROLL',
  ATTENDANCE = 'ATTENDANCE',
  LEAVE = 'LEAVE',
  PERFORMANCE = 'PERFORMANCE'
}

interface AuditTrail {
  id: string;
  reportName: string;
  reportType: ReportType;
  generatedBy: string;
  generatedAt: Date;
  department: string;
  action: string;
  fileSize: string;
  downloadCount: number;
  status: string;
  ipAddress: string;
  userAgent: string;
  filters: string[];
  templateUsed: string;
}

@Component({
  selector: 'app-audit-trail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './audit-trail.component.html',
  styleUrls: ['./audit-trail.component.scss'],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class AuditTrailComponent implements OnInit {
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

  auditFilters = {
    dateRange: '',
    department: '',
    action: '',
    status: '',
    reportType: ''
  };

  showViewModal = false;
  selectedAudit: AuditTrail | null = null;

  constructor() { }

  ngOnInit(): void { }

  exportAuditTrail(): void {
    // TODO: Implement export functionality
    console.log('Exporting audit trail...');
  }

  clearAuditTrail(): void {
    if (confirm('Are you sure you want to clear all audit trail records? This action cannot be undone.')) {
      this.auditTrails = [];
    }
  }

  filterAuditTrails(): void {
    // TODO: Implement filter functionality
    console.log('Applying filters:', this.auditFilters);
  }

  deleteAuditTrail(id: string): void {
    if (confirm('Are you sure you want to delete this audit trail record?')) {
      this.auditTrails = this.auditTrails.filter(trail => trail.id !== id);
    }
  }

  viewAuditTrail(audit: AuditTrail): void {
    this.selectedAudit = audit;
    this.showViewModal = true;
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.selectedAudit = null;
  }

  getActionIcon(action: string): string {
    switch (action.toLowerCase()) {
      case 'generated': return 'fas fa-file-alt';
      case 'exported': return 'fas fa-file-export';
      case 'printed': return 'fas fa-print';
      case 'modified': return 'fas fa-edit';
      case 'deleted': return 'fas fa-trash';
      default: return 'fas fa-file';
    }
  }

  getActionColor(action: string): string {
    switch (action.toLowerCase()) {
      case 'generated': return '#2563eb';
      case 'exported': return '#16a34a';
      case 'printed': return '#9333ea';
      case 'modified': return '#eab308';
      case 'deleted': return '#dc2626';
      default: return '#6b7280';
    }
  }

  getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
      case 'success': return 'fas fa-check-circle';
      case 'failed': return 'fas fa-times-circle';
      case 'pending': return 'fas fa-clock';
      default: return 'fas fa-question-circle';
    }
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'success': return '#16a34a';
      case 'failed': return '#dc2626';
      case 'pending': return '#eab308';
      default: return '#6b7280';
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  }
}
