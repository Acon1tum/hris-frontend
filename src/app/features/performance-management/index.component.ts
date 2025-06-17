import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-performance-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class PerformanceManagementComponent {
  title = 'Performance Management';
  performanceFeatures = [
    { name: 'Goal Setting', description: 'Set and track employee goals', icon: '🎯' },
    { name: 'Performance Reviews', description: 'Conduct and record performance reviews', icon: '📝' },
    { name: 'Feedback', description: 'Give and receive feedback', icon: '💬' },
    { name: 'Appraisal History', description: 'View past appraisals and ratings', icon: '📈' },
    { name: 'Recognition', description: 'Recognize outstanding performance', icon: '🏆' },
    { name: 'Development Plans', description: 'Create and monitor development plans', icon: '🗂️' }
  ];
} 