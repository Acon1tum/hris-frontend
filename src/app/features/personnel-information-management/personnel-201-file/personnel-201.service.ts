import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Personnel201File } from './personnel-201-file.component';

@Injectable({
  providedIn: 'root'
})
export class Personnel201Service {
  getPersonnelFiles(): Observable<Personnel201File[]> {
    const files: Personnel201File[] = [
      {
        id: 1,
        employeeName: 'Juan Dela Cruz',
        firstName: 'Juan',
        middleName: 'Santos',
        lastName: 'Dela Cruz',
        suffix: 'Jr.',
        email: 'JuanCruz@gmail.com',
        number: '0917-123-4567',
        address: '123 Mabini St., Manila, Philippines',
        department: 'Human Resources',
        position: 'HR Officer',
        dateCreated: '2024-06-01',
        lastModified: '2024-06-01',
        createdBy: 'admin',
        modifiedBy: 'admin',
        auditTrail: [
          { action: 'create', timestamp: '2024-06-01 09:00', user: 'admin', details: 'Created file' }
        ],
        birthdate: '1990-01-01',
        gender: 'Male',
        civilStatus: 'Single',
        citizenship: 'Filipino',
        employmentType: 'Regular',
        designation: 'HR Officer',
        appointmentDate: '2024-06-01',
        startDate: '2024-06-01',
        employmentStatus: 'Active',
        jobLevel: 'Level 1',
        jobGrade: 'Grade A',
        gsis: '123456789',
        pagibig: '987654321',
        philhealth: '1122334455',
        sss: '5566778899',
        dependents: 'Maria Dela Cruz',
        emergencyContactName: 'Pedro Dela Cruz',
        emergencyContactNumber: '0918-111-2222',
        emergencyContactRelationship: 'Brother',
        fileName: 'resume.pdf',
        profilePictureUrl: '',
        profilePictureFile: null
      },
      {
        id: 2,
        employeeName: 'Maria Santos',
        firstName: 'Maria',
        middleName: 'Reyes',
        lastName: 'Santos',
        suffix: '',
        email: 'maria.santos@example.com',
        number: '0918-765-4321',
        address: '456 Rizal Ave., Quezon City, Philippines',
        department: 'Finance',
        position: 'Finance Analyst',
        dateCreated: '2024-06-10',
        lastModified: '2024-06-12',
        createdBy: 'admin',
        modifiedBy: 'admin',
        auditTrail: [
          { action: 'create', timestamp: '2024-06-10 10:30', user: 'admin', details: 'Created file' }
        ],
        birthdate: '1988-05-15',
        gender: 'Female',
        civilStatus: 'Married',
        citizenship: 'Filipino',
        employmentType: 'Regular',
        designation: 'Finance Analyst',
        appointmentDate: '2024-06-10',
        startDate: '2024-06-10',
        employmentStatus: 'Active',
        jobLevel: 'Level 2',
        jobGrade: 'Grade B',
        gsis: '987654321',
        pagibig: '123456789',
        philhealth: '9988776655',
        sss: '4433221100',
        dependents: 'Juan Santos Jr.',
        emergencyContactName: 'Ana Santos',
        emergencyContactNumber: '0917-222-3333',
        emergencyContactRelationship: 'Spouse',
        fileName: 'maria_resume.pdf',
        profilePictureUrl: '',
        profilePictureFile: null
      }
    ];
    return of(files);
  }
} 