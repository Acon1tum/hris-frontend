import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payroll-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class PayrollManagementComponent {
  title = 'Payroll Management';
  
  payrollFeatures = [
    { name: 'Salary Processing', description: 'Calculate and process employee salaries', icon: '💰' },
    { name: 'Tax Calculations', description: 'Automated tax deductions and calculations', icon: '🧮' },
    { name: 'Benefits Deductions', description: 'Manage benefits and insurance deductions', icon: '🏥' },
    { name: 'Payslip Generation', description: 'Generate and distribute payslips', icon: '📄' },
    { name: 'Overtime Pay', description: 'Calculate overtime and bonus payments', icon: '⏰' },
    { name: 'Payroll Reports', description: 'Comprehensive payroll reporting and analytics', icon: '📊' }
  ];
} 