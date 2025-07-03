import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

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

type CardKey = 'totalCredit' | 'usedCredit' | 'remainingCredit' | 'approved' | 'rejected' | 'pending';

@Component({
  selector: 'app-leave-request-management',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
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

  // --- Dashboard Card Filters and Data ---

  // Dummy employee types and departments for filter options
  employeeTypes = [
    'All Types',
    'Regular',
    'Contractual',
    'Probationary',
    'Project-Based'
  ];
  departments = [
    'All Departments',
    'HR',
    'IT',
    'Finance',
    'Operations'
  ];

  // Dashboard cards config
  dashboardCards: { key: CardKey, label: string, valueFn: () => number }[] = [
    { key: 'totalCredit', label: 'Total Credit Number', valueFn: () => this.getTotalCredit('totalCredit') },
    { key: 'usedCredit', label: 'Total Used Credit', valueFn: () => this.getUsedCredit('usedCredit') },
    { key: 'remainingCredit', label: 'Total Remaining Credit', valueFn: () => this.getRemainingCredit('remainingCredit') },
    { key: 'approved', label: 'Total Approved Request', valueFn: () => this.getTotalApproved('approved') },
    { key: 'rejected', label: 'Total Rejected Request', valueFn: () => this.getTotalRejected('rejected') },
    { key: 'pending', label: 'Total Pending Request', valueFn: () => this.getTotalPending('pending') }
  ];

  // Dashboard card filter state
  cardFilters: Record<CardKey, { employee: string; employeeType: string; department: string }> = {
    totalCredit: { employee: 'All Employees', employeeType: 'All Types', department: 'All Departments' },
    usedCredit: { employee: 'All Employees', employeeType: 'All Types', department: 'All Departments' },
    remainingCredit: { employee: 'All Employees', employeeType: 'All Types', department: 'All Departments' },
    approved: { employee: 'All Employees', employeeType: 'All Types', department: 'All Departments' },
    rejected: { employee: 'All Employees', employeeType: 'All Types', department: 'All Departments' },
    pending: { employee: 'All Employees', employeeType: 'All Types', department: 'All Departments' }
  };

  // Dummy credit data per employee (in real app, fetch from backend)
  employeeCredits = [
    { employeeId: 'EMP-001', total: 20, used: 5, type: 'Regular', department: 'HR' },
    { employeeId: 'EMP-002', total: 15, used: 3, type: 'Contractual', department: 'IT' },
    { employeeId: 'EMP-003', total: 10, used: 7, type: 'Regular', department: 'Finance' },
    { employeeId: 'EMP-004', total: 30, used: 20, type: 'Regular', department: 'Operations' },
    { employeeId: 'EMP-005', total: 12, used: 2, type: 'Probationary', department: 'HR' },
    { employeeId: 'EMP-006', total: 8, used: 1, type: 'Project-Based', department: 'IT' }
  ];

  // --- Dashboard Card Logic ---
  getTotalCredit(card: keyof typeof this.cardFilters): number {
    return this.employeeCredits
      .filter(e => this.filterEmployeeCredit(e, this.cardFilters[card]))
      .reduce((sum, e) => sum + e.total, 0);
  }
  getUsedCredit(card: keyof typeof this.cardFilters): number {
    return this.employeeCredits
      .filter(e => this.filterEmployeeCredit(e, this.cardFilters[card]))
      .reduce((sum, e) => sum + e.used, 0);
  }
  getRemainingCredit(card: keyof typeof this.cardFilters): number {
    return this.employeeCredits
      .filter(e => this.filterEmployeeCredit(e, this.cardFilters[card]))
      .reduce((sum, e) => sum + (e.total - e.used), 0);
  }
  getTotalApproved(card: keyof typeof this.cardFilters): number {
    return this.leaveRequests
      .filter(r => r.status === 'approved' && this.filterLeaveRequest(r, this.cardFilters[card]))
      .length;
  }
  getTotalRejected(card: keyof typeof this.cardFilters): number {
    return this.leaveRequests
      .filter(r => r.status === 'rejected' && this.filterLeaveRequest(r, this.cardFilters[card]))
      .length;
  }
  getTotalPending(card: keyof typeof this.cardFilters): number {
    return this.leaveRequests
      .filter(r => r.status === 'pending' && this.filterLeaveRequest(r, this.cardFilters[card]))
      .length;
  }

  filterEmployeeCredit(e: any, filter: any): boolean {
    let employeeMatch = false;
    if (filter.employee === 'All Employees') {
      employeeMatch = true;
    } else {
      const empId = this.getEmployeeIdByName(filter.employee);
      employeeMatch = empId !== undefined && empId === e.employeeId;
    }
    const typeMatch = filter.employeeType === 'All Types' || filter.employeeType === e.type;
    const deptMatch = filter.department === 'All Departments' || filter.department === e.department;
    return employeeMatch && typeMatch && deptMatch;
  }

  filterLeaveRequest(r: LeaveRequest, filter: any): boolean {
    const employeeMatch = filter.employee === 'All Employees' || r.employeeName === filter.employee;
    // Find employee type and department from employeeCredits
    const empCredit = this.employeeCredits.find(e => e.employeeId === r.employeeId);
    const typeMatch = filter.employeeType === 'All Types' || (empCredit !== undefined && empCredit.type === filter.employeeType);
    const deptMatch = filter.department === 'All Departments' || (empCredit !== undefined && empCredit.department === filter.department);
    return employeeMatch && typeMatch && deptMatch;
  }

  getEmployeeIdByName(name: string): string | undefined {
    const emp = this.leaveRequests.find(e => e.employeeName === name);
    return emp ? emp.employeeId : undefined;
  }

  // --- Chart Data for Each Card ---
  cardCharts: Record<CardKey, { labels: string[]; data: number[] }> = {
    totalCredit: { labels: [], data: [] },
    usedCredit: { labels: [], data: [] },
    remainingCredit: { labels: [], data: [] },
    approved: { labels: [], data: [] },
    rejected: { labels: [], data: [] },
    pending: { labels: [], data: [] }
  };

  updateCardCharts(): void {
    // Example: Pie chart by department for each card
    ['totalCredit', 'usedCredit', 'remainingCredit'].forEach(card => {
      const filter = this.cardFilters[card as keyof typeof this.cardFilters];
      const byDept: { [dept: string]: number } = {};
      this.departments.filter(d => d !== 'All Departments').forEach(dept => {
        let value = 0;
        if (card === 'totalCredit') value = this.employeeCredits.filter(e => this.filterEmployeeCredit(e, { ...filter, department: dept })).reduce((sum, e) => sum + e.total, 0);
        if (card === 'usedCredit') value = this.employeeCredits.filter(e => this.filterEmployeeCredit(e, { ...filter, department: dept })).reduce((sum, e) => sum + e.used, 0);
        if (card === 'remainingCredit') value = this.employeeCredits.filter(e => this.filterEmployeeCredit(e, { ...filter, department: dept })).reduce((sum, e) => sum + (e.total - e.used), 0);
        byDept[dept] = value;
      });
      this.cardCharts[card as keyof typeof this.cardCharts] = {
        labels: Object.keys(byDept),
        data: Object.values(byDept)
      };
    });
    // For requests (approved, rejected, pending)
    ['approved', 'rejected', 'pending'].forEach(card => {
      const filter = this.cardFilters[card as keyof typeof this.cardFilters];
      const byDept: { [dept: string]: number } = {};
      this.departments.filter(d => d !== 'All Departments').forEach(dept => {
        const count = this.leaveRequests.filter(r => r.status === card && this.filterLeaveRequest(r, { ...filter, department: dept })).length;
        byDept[dept] = count;
      });
      this.cardCharts[card as keyof typeof this.cardCharts] = {
        labels: Object.keys(byDept),
        data: Object.values(byDept)
      };
    });
  }

  // Donut Graph 1 State
  donut1ViewByOptions = [
    { value: 'all', label: 'All Employees (by Department)' },
    { value: 'department', label: 'Department (by Employee Type)' }
  ];
  donut1MetricOptions = [
    { value: 'total', label: 'Total Credit' },
    { value: 'used', label: 'Total Used Credit' },
    { value: 'remaining', label: 'Total Remaining Credit' }
  ];
  donut1SelectedViewBy: 'all' | 'department' = 'all';
  donut1SelectedMetric: 'total' | 'used' | 'remaining' = 'used';
  donut1SelectedDepartment: string = 'All Departments';
  donut1SelectedEmployeeType: string = 'All Types';
  donut1ChartData = { labels: [] as string[], data: [] as number[] };

  donut2FilterTypeOptions = [
    { value: 'all', label: 'All Employees' },
    { value: 'department', label: 'Per Department' },
    { value: 'employeeType', label: 'Employee Type' }
  ];
  donut2SelectedFilterType: 'all' | 'department' | 'employeeType' = 'all';
  donut2SelectedDepartment: string = 'All Departments';
  donut2SelectedEmployeeType: string = 'All Types';
  donut2SelectedLeaveType: string = 'All Types';
  donut2ChartData = { labels: [] as string[], data: [] as number[] };

  // Donut Graph 1 Logic (updated)
  updateDonut1Chart(): void {
    let filteredCredits = this.employeeCredits;
    // Filter by department if selected
    if (this.donut1SelectedDepartment && this.donut1SelectedDepartment !== 'All Departments') {
      filteredCredits = filteredCredits.filter(e => e.department === this.donut1SelectedDepartment);
    }
    // Filter by employee type if selected
    if (this.donut1SelectedEmployeeType && this.donut1SelectedEmployeeType !== 'All Types') {
      filteredCredits = filteredCredits.filter(e => e.type === this.donut1SelectedEmployeeType);
    }
    const totalCredit = filteredCredits.reduce((sum, e) => sum + e.total, 0);
    const usedCredit = filteredCredits.reduce((sum, e) => sum + e.used, 0);
    const remainingCredit = totalCredit - usedCredit;
    // Calculate percentages
    const usedPercent = totalCredit > 0 ? (usedCredit / totalCredit) * 100 : 0;
    const remainingPercent = totalCredit > 0 ? (remainingCredit / totalCredit) * 100 : 0;
    this.donut1ChartData = {
      labels: [
        `Used Credit (${usedPercent.toFixed(0)}%)`,
        `Remaining Credit (${remainingPercent.toFixed(0)}%)`
      ],
      data: [usedCredit, remainingCredit < 0 ? 0 : remainingCredit]
    };
  }

  onDonut1FilterChange(): void {
    this.updateDonut1Chart();
  }

  // Donut Graph 2 Logic (updated)
  updateDonut2Chart(): void {
    const leaveTypes = this.leaveTypes.filter(t => t !== 'All Types');
    const byType: { [type: string]: number } = {};
    let filteredRequests = this.leaveRequests.filter(r => r.status === 'approved');
    let filteredCredits = this.employeeCredits;
    if (this.donut2SelectedFilterType === 'department') {
      if (this.donut2SelectedDepartment && this.donut2SelectedDepartment !== 'All Departments') {
        filteredCredits = filteredCredits.filter(e => e.department === this.donut2SelectedDepartment);
      }
      const empIds = filteredCredits.map(e => e.employeeId);
      filteredRequests = filteredRequests.filter(r => empIds.includes(r.employeeId));
    } else if (this.donut2SelectedFilterType === 'employeeType') {
      if (this.donut2SelectedEmployeeType && this.donut2SelectedEmployeeType !== 'All Types') {
        filteredCredits = filteredCredits.filter(e => e.type === this.donut2SelectedEmployeeType);
      }
      const empIds = filteredCredits.map(e => e.employeeId);
      filteredRequests = filteredRequests.filter(r => empIds.includes(r.employeeId));
    }
    // Apply leave type filter
    if (this.donut2SelectedLeaveType && this.donut2SelectedLeaveType !== 'All Types') {
      // Only show the selected leave type
      const sum = filteredRequests.filter(r => r.leaveType === this.donut2SelectedLeaveType).reduce((acc, r) => acc + r.days, 0);
      byType[this.donut2SelectedLeaveType] = sum;
      this.donut2ChartData = {
        labels: [this.donut2SelectedLeaveType],
        data: [sum]
      };
      return;
    }
    leaveTypes.forEach(type => {
      // Sum the days (credits used) for this leave type
      const sum = filteredRequests.filter(r => r.leaveType === type).reduce((acc, r) => acc + r.days, 0);
      byType[type] = sum;
    });
    this.donut2ChartData = {
      labels: Object.keys(byType),
      data: Object.values(byType)
    };
  }

  onDonut2FilterChange(): void {
    this.updateDonut2Chart();
  }

  // Line chart data and update logic for each dashboard card
  cardLineCharts: Record<CardKey, { labels: string[]; datasets: any[] }> = {
    totalCredit: { labels: [], datasets: [] },
    usedCredit: { labels: [], datasets: [] },
    remainingCredit: { labels: [], datasets: [] },
    approved: { labels: [], datasets: [] },
    rejected: { labels: [], datasets: [] },
    pending: { labels: [], datasets: [] }
  };

  updateCardLineChart(card: CardKey): void {
    const filter = this.cardFilters[card];
    let labels: string[] = [];
    let datasets: any[] = [];
    const employeeTypes = this.employeeTypes.filter(t => t !== 'All Types');
    if (filter.employee === 'All Employees') {
      // X-axis: Departments, lines: employee types
      labels = this.departments.filter(d => d !== 'All Departments');
      datasets = employeeTypes.map((type, idx) => {
        const data = labels.map(dept => {
          if (card === 'totalCredit') {
            return this.employeeCredits.filter(e => e.department === dept && e.type === type && this.filterEmployeeCredit(e, { ...filter, department: dept, employeeType: type })).reduce((sum, e) => sum + e.total, 0);
          } else if (card === 'usedCredit') {
            return this.employeeCredits.filter(e => e.department === dept && e.type === type && this.filterEmployeeCredit(e, { ...filter, department: dept, employeeType: type })).reduce((sum, e) => sum + e.used, 0);
          } else if (card === 'remainingCredit') {
            return this.employeeCredits.filter(e => e.department === dept && e.type === type && this.filterEmployeeCredit(e, { ...filter, department: dept, employeeType: type })).reduce((sum, e) => sum + (e.total - e.used), 0);
          } else {
            // For status cards, count requests by status
            const empIds = this.employeeCredits.filter(e => e.department === dept && e.type === type && this.filterEmployeeCredit(e, { ...filter, department: dept, employeeType: type })).map(e => e.employeeId);
            return this.leaveRequests.filter(r => r.status === card && empIds.includes(r.employeeId)).length;
          }
        });
        return {
          label: type,
          data,
          borderColor: this.getLineColor(idx),
          backgroundColor: this.getLineBgColor(idx),
          fill: false,
          tension: 0.3
        };
      });
    } else if (filter.department && filter.department !== 'All Departments') {
      // X-axis: Employee Types in the selected department, lines: single line for department
      labels = employeeTypes;
      datasets = [
        {
          label: filter.department,
          data: labels.map(type => {
            if (card === 'totalCredit') {
              return this.employeeCredits.filter(e => e.department === filter.department && e.type === type && this.filterEmployeeCredit(e, { ...filter, employeeType: type })).reduce((sum, e) => sum + e.total, 0);
            } else if (card === 'usedCredit') {
              return this.employeeCredits.filter(e => e.department === filter.department && e.type === type && this.filterEmployeeCredit(e, { ...filter, employeeType: type })).reduce((sum, e) => sum + e.used, 0);
            } else if (card === 'remainingCredit') {
              return this.employeeCredits.filter(e => e.department === filter.department && e.type === type && this.filterEmployeeCredit(e, { ...filter, employeeType: type })).reduce((sum, e) => sum + (e.total - e.used), 0);
            } else {
              const empIds = this.employeeCredits.filter(e => e.department === filter.department && e.type === type && this.filterEmployeeCredit(e, { ...filter, employeeType: type })).map(e => e.employeeId);
              return this.leaveRequests.filter(r => r.status === card && empIds.includes(r.employeeId)).length;
            }
          }),
          borderColor: this.getLineColor(0),
          backgroundColor: this.getLineBgColor(0),
          fill: false,
          tension: 0.3
        }
      ];
    } else {
      // Fallback: single value
      labels = ['Value'];
      datasets = [
        {
          label: this.dashboardCards.find(c => c.key === card)?.label || '',
          data: [
            card === 'totalCredit' ? this.getTotalCredit(card) :
            card === 'usedCredit' ? this.getUsedCredit(card) :
            card === 'remainingCredit' ? this.getRemainingCredit(card) :
            this.leaveRequests.filter(r => r.status === card && this.filterLeaveRequest(r, filter)).length
          ],
          borderColor: this.getLineColor(0),
          backgroundColor: this.getLineBgColor(0),
          fill: false,
          tension: 0.3
        }
      ];
    }
    this.cardLineCharts[card] = {
      labels,
      datasets
    };
  }

  getLineColor(idx: number): string {
    const colors = ['#0c7ff2', '#f59e42', '#10b981', '#6366f1', '#ef4444', '#fbbf24', '#8b5cf6', '#14b8a6'];
    return colors[idx % colors.length];
  }
  getLineBgColor(idx: number): string {
    const colors = ['rgba(12,127,242,0.1)', 'rgba(245,158,66,0.1)', 'rgba(16,185,129,0.1)', 'rgba(99,102,241,0.1)', 'rgba(239,68,68,0.1)', 'rgba(251,191,36,0.1)', 'rgba(139,92,246,0.1)', 'rgba(20,184,166,0.1)'];
    return colors[idx % colors.length];
  }

  constructor() { }

  ngOnInit(): void {
    this.updateTabCounts();
    this.updateCardCharts();
    this.updateDonut1Chart();
    this.updateDonut2Chart();
    (['totalCredit', 'usedCredit', 'remainingCredit', 'approved', 'rejected', 'pending'] as CardKey[]).forEach(card => this.updateCardLineChart(card));
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

  onCardFilterChange(card: CardKey): void {
    this.updateCardCharts();
    this.updateCardLineChart(card);
  }
} 