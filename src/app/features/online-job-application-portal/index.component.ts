import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-online-job-application-portal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class OnlineJobApplicationPortalComponent {
  title = 'Online Job Application Portal';
  portalFeatures = [
    { name: 'Job Listings', description: 'Browse and search available jobs', icon: '🔍' },
    { name: 'Online Application', description: 'Apply for jobs online', icon: '📝' },
    { name: 'Application Status', description: 'Track application progress', icon: '📈' },
    { name: 'Resume Upload', description: 'Upload and manage resumes', icon: '📄' },
    { name: 'Interview Scheduling', description: 'Book interview slots online', icon: '📅' },
    { name: 'Communication Hub', description: 'Direct messaging with HR team', icon: '💬' }
  ];
}
 