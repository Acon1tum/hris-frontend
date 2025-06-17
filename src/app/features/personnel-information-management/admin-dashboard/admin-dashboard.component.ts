import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  title = 'Personnel Management Dashboard';
  
  // Dashboard stats
  dashboardStats = [
    { label: 'Total Employees', value: '345', icon: '👥' },
    { label: 'Pending Requests', value: '12', icon: '📋' },
    { label: 'Recent Movements', value: '23', icon: '🔄' }
  ];

  // Employee data
  recentEmployees = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@acme.com',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      department: 'Marketing',
      position: 'Marketing Manager',
      status: 'Active',
      joinDate: '15 Jan 2020'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.c@acme.com',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      department: 'Engineering',
      position: 'Senior Developer',
      status: 'Active',
      joinDate: '22 Mar 2019'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.r@acme.com',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      department: 'Human Resources',
      position: 'HR Specialist',
      status: 'On Leave',
      joinDate: '05 Aug 2021'
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.w@acme.com',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      department: 'Finance',
      position: 'Financial Analyst',
      status: 'Active',
      joinDate: '12 Nov 2022'
    }
  ];

  // Quick actions
  quickActions = [
    { name: 'Add Employee', icon: 'add_circle', action: 'addEmployee' },
    { name: 'Process Requests', icon: 'rule', action: 'processRequests' },
    { name: 'Generate Reports', icon: 'assessment', action: 'generateReports' }
  ];

  onQuickAction(action: string) {
    console.log('Quick action:', action);
    // Implement action logic here
  }

  onEditEmployee(employeeId: number) {
    console.log('Edit employee:', employeeId);
    // Implement edit logic here
  }

  onDeleteEmployee(employeeId: number) {
    console.log('Delete employee:', employeeId);
    // Implement delete logic here
  }

  onViewAllEmployees() {
    console.log('View all employees');
    // Implement view all logic here
  }
} 