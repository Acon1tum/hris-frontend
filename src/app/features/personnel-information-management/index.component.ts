import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-personnel-information-management',
  standalone: true,
  imports: [CommonModule, AdminDashboardComponent],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class PersonnelInformationManagementComponent {
  title = 'Personnel Information Management';
  showAdminDashboard = false;
  
  personnelFeatures = [
    { name: 'Employee Directory', description: 'View and manage employee information', icon: '📋' },
    { name: 'Employee Profiles', description: 'Detailed employee profiles and history', icon: '👤' },
    { name: 'Department Management', description: 'Organize employees by departments', icon: '🏢' },
    { name: 'Position Management', description: 'Manage job positions and titles', icon: '💼' },
    { name: 'Contact Information', description: 'Update employee contact details', icon: '📞' },
    { name: 'Document Management', description: 'Store and manage employee documents', icon: '📁' }
  ];

  toggleAdminDashboard() {
    this.showAdminDashboard = !this.showAdminDashboard;
  }
} 