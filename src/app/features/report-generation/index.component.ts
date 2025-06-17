import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-generation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class ReportGenerationComponent {
  title = 'Report Generation';
  
  reportFeatures = [
    { name: 'Employee Reports', description: 'Generate comprehensive employee reports', icon: '👥' },
    { name: 'Payroll Reports', description: 'Salary and compensation analytics', icon: '💰' },
    { name: 'Attendance Reports', description: 'Time and attendance analytics', icon: '⏰' },
    { name: 'Leave Reports', description: 'Leave utilization and trends', icon: '📅' },
    { name: 'Performance Reports', description: 'Employee performance analytics', icon: '📈' },
    { name: 'Custom Reports', description: 'Create custom reports and dashboards', icon: '🔧' }
  ];
} 