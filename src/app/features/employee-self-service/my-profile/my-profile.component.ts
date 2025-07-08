import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeSelfService } from '../../../services/employee-self-service.service';
import { UserProfile } from '../../../interfaces/my-profile.interface';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  loading = false;
  error: string | null = null;

  constructor(private employeeSelfService: EmployeeSelfService) {}

  ngOnInit() {
    this.fetchProfile();
  }

  fetchProfile() {
    this.loading = true;
    this.error = null;
    this.employeeSelfService.fetchMyProfile().subscribe({
      next: (res) => {
        console.log('API my-profile response:', res);
        if (res.data) {
          console.log('General:', res.data.general);
          console.log('Employment:', res.data.employment);
          console.log('Membership:', res.data.membership);
          console.log('Other:', res.data.other);
        }
        if (res.success) {
          this.userProfile = res.data;
        } else {
          this.error = res.message || 'Failed to load profile';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Error loading profile';
        this.loading = false;
      }
    });
  }

  onEditProfile() {
    console.log('Edit profile clicked');
    // Implementation for profile editing modal/form
  }

  // Helper methods for template - organized field data for clean display
  get generalInformationFields() {
    if (!this.userProfile) return [];
    return [
      { label: 'First Name', value: this.userProfile.general.firstName },
      { label: 'Middle Name', value: this.userProfile.general.middleName },
      { label: 'Last Name', value: this.userProfile.general.lastName },
      { label: 'Birthdate', value: this.userProfile.general.birthdate },
      { label: 'Contact Number', value: this.userProfile.general.contactNumber },
      { label: 'Address', value: this.userProfile.general.address },
      { label: 'Email', value: this.userProfile.general.email },
      { label: 'Gender', value: this.userProfile.general.gender },
      { label: 'Civil Status', value: this.userProfile.general.civilStatus },
      { label: 'Citizenship', value: this.userProfile.general.citizenship }
    ];
  }

  get employmentDetailsFields() {
    if (!this.userProfile) return [];
    return [
      { label: 'Employment Type', value: this.userProfile.employment.employmentType },
      { label: 'Designation', value: this.userProfile.employment.designation },
      { label: 'Department', value: this.userProfile.employment.department },
      { label: 'Appointment Date', value: this.userProfile.employment.appointmentDate },
      { label: 'Start Date', value: this.userProfile.employment.startDate },
      { label: 'Employment Status', value: this.userProfile.employment.employmentStatus },
      { label: 'Job Level', value: this.userProfile.employment.jobLevel },
      { label: 'Job Grade', value: this.userProfile.employment.jobGrade }
    ];
  }

  get membershipInformationFields() {
    if (!this.userProfile) return [];
    return [
      { label: 'GSIS', value: this.userProfile.membership.gsis },
      { label: 'Pag-IBIG', value: this.userProfile.membership.pagibig },
      { label: 'PhilHealth', value: this.userProfile.membership.philhealth },
      { label: 'SSS', value: this.userProfile.membership.sss }
    ];
  }

  get otherInformationFields() {
    if (!this.userProfile) return [];
    return [
      { label: 'Dependents', value: this.userProfile.other.dependents },
      { label: 'Emergency Contact Name', value: this.userProfile.other.emergencyContactName },
      { label: 'Emergency Contact Number', value: this.userProfile.other.emergencyContactNumber },
      { label: 'Emergency Contact Relationship', value: this.userProfile.other.emergencyContactRelationship }
    ];
  }
} 