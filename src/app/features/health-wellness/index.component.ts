import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-health-wellness',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class HealthWellnessComponent {
  title = 'Health & Wellness';
  healthFeatures = [
    { name: 'Health Programs', description: 'Access company health programs', icon: '🏥' },
    { name: 'Wellness Activities', description: 'Participate in wellness activities', icon: '🏃' },
    { name: 'Medical Records', description: 'View and manage medical records', icon: '📋' },
    { name: 'Insurance Management', description: 'Manage health insurance details', icon: '🩺' },
    { name: 'Health Assessments', description: 'Take health assessments and surveys', icon: '📝' },
    { name: 'Support Resources', description: 'Access support and counseling', icon: '🤝' }
  ];
} 