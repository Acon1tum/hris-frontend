import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface LeaveRequest {
  id: number;
  employeeName: string;
  employeeId: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  reason?: string;
  submittedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectionReason?: string;
}

export interface LeaveRequestFilter {
  searchTerm: string;
  status: string;
  employee: string;
  leaveType: string;
  startDate: string;
  endDate: string;
}

export interface LeaveRequestTab {
  id: string;
  label: string;
  count: number;
  active: boolean;
}

@Component({
  selector: 'app-leave-request-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leave-request-management.component.html',
  styleUrls: ['./leave-request-management.component.scss']
})
export class LeaveRequestManagementComponent implements OnInit {
  title = 'Leave Request Management';
  
  // Filter properties
  filters: LeaveRequestFilter = {
    searchTerm: '',
    status: '',
    employee: '',
    leaveType: '',
    startDate: '',
    endDate: ''
  };

  // Tab navigation
  tabs: LeaveRequestTab[] = [
    { id: 'all', label: 'All', count: 0, active: true },
    { id: 'pending', label: 'Pending', count: 0, active: false },
    { id: 'approved', label: 'Approved', count: 0, active: false },
    { id: 'rejected', label: 'Rejected', count: 0, active: false },
    { id: 'cancelled', label: 'Cancelled', count: 0, active: false }
  ];

  // Sample leave request data
  leaveRequests: LeaveRequest[] = [
    {
      id: 1,
      employeeName: 'Ethan Carter',
      employeeId: 'EMP-001',
      leaveType: 'Vacation',
      startDate: '2024-05-15',
      endDate: '2024-05-20',
      days: 5,
      status: 'approved',
      reason: 'Family vacation',
      submittedDate: '2024-05-01',
      approvedBy: 'Sarah Johnson',
      approvedDate: '2024-05-02'
    },
    {
      id: 2,
      employeeName: 'Olivia Bennett',
      employeeId: 'EMP-002',
      leaveType: 'Sick Leave',
      startDate: '2024-06-01',
      endDate: '2024-06-03',
      days: 3,
      status: 'pending',
      reason: 'Medical treatment',
      submittedDate: '2024-05-28'
    },
    {
      id: 3,
      employeeName: 'Noah Thompson',
      employeeId: 'EMP-003',
      leaveType: 'Personal Leave',
      startDate: '2024-04-20',
      endDate: '2024-04-22',
      days: 3,
      status: 'rejected',
      reason: 'Personal matters',
      submittedDate: '2024-04-15',
      rejectionReason: 'Insufficient notice period'
    },
    {
      id: 4,
      employeeName: 'Ava Rodriguez',
      employeeId: 'EMP-004',
      leaveType: 'Maternity Leave',
      startDate: '2024-03-10',
      endDate: '2024-06-10',
      days: 92,
      status: 'approved',
      reason: 'Maternity leave',
      submittedDate: '2024-02-15',
      approvedBy: 'Michael Davis',
      approvedDate: '2024-02-16'
    },
    {
      id: 5,
      employeeName: 'Liam Harper',
      employeeId: 'EMP-005',
      leaveType: 'Vacation',
      startDate: '2024-02-15',
      endDate: '2024-02-20',
      days: 6,
      status: 'cancelled',
      reason: 'Winter vacation',
      submittedDate: '2024-01-20'
    },
    {
      id: 6,
      employeeName: 'Emma Wilson',
      employeeId: 'EMP-006',
      leaveType: 'Emergency Leave',
      startDate: '2024-07-01',
      endDate: '2024-07-02',
      days: 2,
      status: 'pending',
      reason: 'Family emergency',
      submittedDate: '2024-06-28'
    }
  ];

  // Dropdown options
  employees = [
    'All Employees',
    'Ethan Carter',
    'Olivia Bennett',
    'Noah Thompson',
    'Ava Rodriguez',
    'Liam Harper',
    'Emma Wilson'
  ];

  leaveTypes = [
    'All Types',
    'Vacation',
    'Sick Leave',
    'Personal Leave',
    'Maternity Leave',
    'Emergency Leave',
    'Study Leave'
  ];

  statusOptions = [
    'All Statuses',
    'Pending',
    'Approved',
    'Rejected',
    'Cancelled'
  ];

  constructor() { }

  ngOnInit(): void {
    this.updateTabCounts();
  }

  // Computed properties
  get filteredRequests(): LeaveRequest[] {
    const activeTab = this.tabs.find(tab => tab.active);
    let filtered = this.leaveRequests;

    // Filter by active tab
    if (activeTab && activeTab.id !== 'all') {
      filtered = filtered.filter(request => request.status === activeTab.id);
    }

    // Apply filters
    if (this.filters.searchTerm) {
      const searchTerm = this.filters.searchTerm.toLowerCase();
      filtered = filtered.filter(request => 
        request.employeeName.toLowerCase().includes(searchTerm) ||
        request.employeeId.toLowerCase().includes(searchTerm) ||
        request.id.toString().includes(searchTerm)
      );
    }

    if (this.filters.status && this.filters.status !== 'All Statuses') {
      filtered = filtered.filter(request => 
        request.status === this.filters.status.toLowerCase()
      );
    }

    if (this.filters.employee && this.filters.employee !== 'All Employees') {
      filtered = filtered.filter(request => 
        request.employeeName === this.filters.employee
      );
    }

    if (this.filters.leaveType && this.filters.leaveType !== 'All Types') {
      filtered = filtered.filter(request => 
        request.leaveType === this.filters.leaveType
      );
    }

    if (this.filters.startDate) {
      filtered = filtered.filter(request => 
        new Date(request.startDate) >= new Date(this.filters.startDate)
      );
    }

    if (this.filters.endDate) {
      filtered = filtered.filter(request => 
        new Date(request.endDate) <= new Date(this.filters.endDate)
      );
    }

    return filtered;
  }

  // Methods
  updateTabCounts(): void {
    this.tabs.forEach(tab => {
      if (tab.id === 'all') {
        tab.count = this.leaveRequests.length;
      } else {
        tab.count = this.leaveRequests.filter(req => req.status === tab.id).length;
      }
    });
  }

  onTabClick(tabId: string): void {
    this.tabs.forEach(tab => {
      tab.active = tab.id === tabId;
    });
  }

  onSearch(): void {
    // Search is handled by the filteredRequests getter
  }

  onApplyFilters(): void {
    console.log('Applying filters:', this.filters);
    // Filtering is handled by the filteredRequests getter
  }

  onClearFilters(): void {
    this.filters = {
      searchTerm: '',
      status: '',
      employee: '',
      leaveType: '',
      startDate: '',
      endDate: ''
    };
    console.log('Filters cleared');
  }

  onViewRequest(request: LeaveRequest): void {
    console.log('Viewing request:', request.id);
    // Implement view request modal or navigation
  }

  onApproveRequest(request: LeaveRequest): void {
    if (request.status === 'pending') {
      request.status = 'approved';
      request.approvedBy = 'Current User'; // Replace with actual user
      request.approvedDate = new Date().toISOString().split('T')[0];
      this.updateTabCounts();
      console.log('Request approved:', request.id);
    }
  }

  onRejectRequest(request: LeaveRequest): void {
    if (request.status === 'pending') {
      request.status = 'rejected';
      request.rejectionReason = 'Rejected by administrator'; // This could open a modal for reason
      this.updateTabCounts();
      console.log('Request rejected:', request.id);
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'approved':
        return 'status-approved';
      case 'pending':
        return 'status-pending';
      case 'rejected':
        return 'status-rejected';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    }).format(date);
  }

  trackByRequestId(index: number, request: LeaveRequest): number {
    return request.id;
  }
} 