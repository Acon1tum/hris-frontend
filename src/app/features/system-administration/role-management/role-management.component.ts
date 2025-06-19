import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Permission {
  name: string;
  color: string;
  bgColor: string;
}

interface Role {
  id: number;
  name: string;
  description: string;
  userCount: number;
  permissions: Permission[];
}

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent {
  
  roles: Role[] = [
    {
      id: 1,
      name: 'Administrator',
      description: 'Full access to all modules and functionalities.',
      userCount: 5,
      permissions: [
        { name: 'All', color: '#166534', bgColor: '#dcfce7' }
      ]
    },
    {
      id: 2,
      name: 'Manager',
      description: 'Access to key modules and reports.',
      userCount: 10,
      permissions: [
        { name: 'View', color: '#1e40af', bgColor: '#dbeafe' },
        { name: 'Create', color: '#a16207', bgColor: '#fef3c7' },
        { name: 'Edit', color: '#7c2d12', bgColor: '#f3e8ff' }
      ]
    },
    {
      id: 3,
      name: 'Analyst',
      description: 'Access to reports and data analysis tools.',
      userCount: 15,
      permissions: [
        { name: 'View', color: '#1e40af', bgColor: '#dbeafe' }
      ]
    },
    {
      id: 4,
      name: 'Support',
      description: 'Limited access to user management and basic modules.',
      userCount: 8,
      permissions: [
        { name: 'View', color: '#1e40af', bgColor: '#dbeafe' },
        { name: 'Edit', color: '#7c2d12', bgColor: '#f3e8ff' }
      ]
    },
    {
      id: 5,
      name: 'Guest',
      description: 'Read-only access to public information.',
      userCount: 20,
      permissions: [
        { name: 'View', color: '#1e40af', bgColor: '#dbeafe' }
      ]
    }
  ];

  onCreateNewRole() {
    console.log('Create new role clicked');
  }

  onEditRole(role: Role) {
    console.log('Edit role:', role.name);
  }

  trackByRoleId(index: number, role: Role): number {
    return role.id;
  }
} 