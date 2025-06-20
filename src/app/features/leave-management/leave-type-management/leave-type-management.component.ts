import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-type-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leave-type-management.component.html',
  styleUrls: ['./leave-type-management.component.scss']
})
export class LeaveTypeManagementComponent {
  title = 'Leave Types Management';
  
  leaveTypes = [
    {
      name: 'Vacation Leave',
      description: 'Paid time off for leisure and relaxation.',
      accrualRules: '2 days per month',
      usageLimits: '24 days per year',
      expiration: 'None',
      documentsRequired: 'None',
      eligibility: 'All Employees'
    },
    {
      name: 'Sick Leave',
      description: 'Paid time off for illness or medical appointments.',
      accrualRules: '1 day per month',
      usageLimits: '12 days per year',
      expiration: 'None',
      documentsRequired: 'Medical Certificate',
      eligibility: 'All Employees'
    },
    {
      name: 'Maternity Leave',
      description: 'Paid time off for new mothers.',
      accrualRules: 'N/A',
      usageLimits: '12 weeks',
      expiration: 'None',
      documentsRequired: 'Birth Certificate',
      eligibility: 'Female Employees'
    },
    {
      name: 'Paternity Leave',
      description: 'Paid time off for new fathers.',
      accrualRules: 'N/A',
      usageLimits: '2 weeks',
      expiration: 'None',
      documentsRequired: 'Birth Certificate',
      eligibility: 'Male Employees'
    },
    {
      name: 'Emergency Leave',
      description: 'Paid time off for unexpected emergencies.',
      accrualRules: 'N/A',
      usageLimits: '3 days per year',
      expiration: 'None',
      documentsRequired: 'None',
      eligibility: 'All Employees'
    }
  ];

  onAddNewLeaveType() {
    // Implementation for adding new leave type
    console.log('Add new leave type');
  }

  onEditLeaveType(leaveType: any) {
    // Implementation for editing leave type
    console.log('Edit leave type:', leaveType);
  }

  onDeleteLeaveType(leaveType: any) {
    // Implementation for deleting leave type
    console.log('Delete leave type:', leaveType);
  }
} 