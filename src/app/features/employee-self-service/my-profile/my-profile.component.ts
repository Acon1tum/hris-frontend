import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GeneralInformation {
  fullName: string;
  birthdate: string;
  contactNumber: string;
  address: string;
  email: string;
  gender: string;
  civilStatus: string;
  citizenship: string;
}

interface EmploymentDetails {
  employmentType: string;
  designation: string;
  department: string;
  appointmentDate: string;
  startDate: string;
  employmentStatus: string;
  jobLevel: string;
  jobGrade: string;
}

interface MembershipInformation {
  gsis: string;
  pagibig: string;
  philhealth: string;
  sss: string;
}

interface OtherInformation {
  dependents: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  emergencyContactRelationship: string;
}

interface UserProfile {
  general: GeneralInformation;
  employment: EmploymentDetails;
  membership: MembershipInformation;
  other: OtherInformation;
}

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {
  
  userProfile: UserProfile = {
    general: {
      fullName: 'Sophia Rodriguez',
      birthdate: 'July 15, 1993',
      contactNumber: '+1-555-123-4567',
      address: '123 Maple Street, Anytown, USA',
      email: 'sophia.rodriguez@email.com',
      gender: 'Female',
      civilStatus: 'Single',
      citizenship: 'Filipino'
    },
    employment: {
      employmentType: 'Regular',
      designation: 'Senior Software Engineer',
      department: 'Technology',
      appointmentDate: 'January 1, 2020',
      startDate: 'January 1, 2020',
      employmentStatus: 'Active',
      jobLevel: 'Level 3',
      jobGrade: 'Grade 15'
    },
    membership: {
      gsis: '123-456-7890',
      pagibig: '987-654-3210',
      philhealth: '11-222222222-3',
      sss: '33-444444444-5'
    },
    other: {
      dependents: 'None',
      emergencyContactName: 'Ethan Carter',
      emergencyContactNumber: '+1-555-987-6543',
      emergencyContactRelationship: 'Father'
    }
  };

  onEditProfile() {
    console.log('Edit profile clicked');
    // Implementation for profile editing modal/form
  }

  // Helper methods for template - organized field data for clean display
  get generalInformationFields() {
    return [
      { label: 'Full Name', value: this.userProfile.general.fullName },
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
    return [
      { label: 'GSIS', value: this.userProfile.membership.gsis },
      { label: 'Pag-IBIG', value: this.userProfile.membership.pagibig },
      { label: 'PhilHealth', value: this.userProfile.membership.philhealth },
      { label: 'SSS', value: this.userProfile.membership.sss }
    ];
  }

  get otherInformationFields() {
    return [
      { label: 'Dependents', value: this.userProfile.other.dependents },
      { label: 'Emergency Contact Name', value: this.userProfile.other.emergencyContactName },
      { label: 'Emergency Contact Number', value: this.userProfile.other.emergencyContactNumber },
      { label: 'Emergency Contact Relationship', value: this.userProfile.other.emergencyContactRelationship }
    ];
  }
} 