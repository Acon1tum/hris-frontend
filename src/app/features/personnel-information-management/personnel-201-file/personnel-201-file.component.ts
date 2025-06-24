import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateEditModalComponent, Personnel201ModalData } from './create-edit-modal/create-edit-modal.component';
import { Personnel201Service } from './personnel-201.service';
import { DetailsAuditTrailModalComponent } from './details-audit-trail-modal/details-audit-trail-modal.component';

export interface AuditTrailEntry {
  action: 'create' | 'edit' | 'delete';
  timestamp: string;
  user: string;
  details: string;
}

export interface Personnel201File {
  id: number;
  employeeName: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  suffix?: string;
  email?: string;
  number?: string;
  address?: string;
  department: string;
  position: string;
  dateCreated: string;
  lastModified: string;
  createdBy: string;
  modifiedBy: string;
  auditTrail: AuditTrailEntry[];
  fileName?: string;
  profilePictureUrl?: string;
  profilePictureFile?: File | null;
  birthdate?: string;
  gender?: string;
  civilStatus?: string;
  citizenship?: string;
  employmentType?: string;
  designation?: string;
  appointmentDate?: string;
  startDate?: string;
  employmentStatus?: string;
  jobLevel?: string;
  jobGrade?: string;
  gsis?: string;
  pagibig?: string;
  philhealth?: string;
  sss?: string;
  dependents?: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
  emergencyContactRelationship?: string;
}

@Component({
  selector: 'app-personnel-201-file',
  standalone: true,
  templateUrl: './personnel-201-file.component.html',
  styleUrls: ['./personnel-201-file.component.scss'],
  imports: [CommonModule, FormsModule, CreateEditModalComponent, DetailsAuditTrailModalComponent]
})
export class Personnel201FileComponent implements OnInit {
  personnelFiles: Personnel201File[] = [];
  selectedFile: Personnel201File | null = null;
  showDetailsModal = false;
  showEditModal = false;
  editMode: 'create' | 'edit' = 'create';
  editFileData: Personnel201ModalData = {
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    email: '',
    number: '',
    address: '',
    department: '',
    position: '',
    file: null,
    fileName: '',
    profilePictureUrl: '',
    profilePictureFile: null,
    birthdate: '',
    gender: '',
    civilStatus: '',
    citizenship: '',
    employmentType: '',
    designation: '',
    appointmentDate: '',
    startDate: '',
    employmentStatus: '',
    jobLevel: '',
    jobGrade: '',
    gsis: '',
    pagibig: '',
    philhealth: '',
    sss: '',
    dependents: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    emergencyContactRelationship: ''
  };
  searchTerm: string = '';

  constructor(private personnelService: Personnel201Service) {}

  ngOnInit() {
    this.personnelService.getPersonnelFiles().subscribe((files: Personnel201File[]) => {
      this.personnelFiles = files;
    });
  }

  get filteredPersonnelFiles(): Personnel201File[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.personnelFiles;
    return this.personnelFiles.filter(file =>
      file.employeeName.toLowerCase().includes(term) ||
      file.department.toLowerCase().includes(term)
    );
  }

  openEditModal(mode: 'create' | 'edit', data?: any) {
    this.editMode = mode;
    if (mode === 'edit' && data) {
      this.editFileData = {
        firstName: data.firstName || '',
        middleName: data.middleName || '',
        lastName: data.lastName || '',
        suffix: data.suffix || '',
        email: data.email || '',
        number: data.number || '',
        address: data.address || '',
        department: data.department || '',
        position: data.position || '',
        file: null,
        fileName: data.fileName || '',
        profilePictureUrl: data.profilePictureUrl || '',
        profilePictureFile: null,
        birthdate: data.birthdate || '',
        gender: data.gender || '',
        civilStatus: data.civilStatus || '',
        citizenship: data.citizenship || '',
        employmentType: data.employmentType || '',
        designation: data.designation || '',
        appointmentDate: data.appointmentDate || '',
        startDate: data.startDate || '',
        employmentStatus: data.employmentStatus || '',
        jobLevel: data.jobLevel || '',
        jobGrade: data.jobGrade || '',
        gsis: data.gsis || '',
        pagibig: data.pagibig || '',
        philhealth: data.philhealth || '',
        sss: data.sss || '',
        dependents: data.dependents || '',
        emergencyContactName: data.emergencyContactName || '',
        emergencyContactNumber: data.emergencyContactNumber || '',
        emergencyContactRelationship: data.emergencyContactRelationship || ''
      };
      (this.editFileData as any).id = data.id;
    } else {
      this.editFileData = {
        firstName: '',
        middleName: '',
        lastName: '',
        suffix: '',
        email: '',
        number: '',
        address: '',
        department: '',
        position: '',
        file: null,
        fileName: '',
        profilePictureUrl: '',
        profilePictureFile: null,
        birthdate: '',
        gender: '',
        civilStatus: '',
        citizenship: '',
        employmentType: '',
        designation: '',
        appointmentDate: '',
        startDate: '',
        employmentStatus: '',
        jobLevel: '',
        jobGrade: '',
        gsis: '',
        pagibig: '',
        philhealth: '',
        sss: '',
        dependents: '',
        emergencyContactName: '',
        emergencyContactNumber: '',
        emergencyContactRelationship: ''
      };
    }
    this.showEditModal = true;
  }

  handleModalSave(modalData: Personnel201ModalData) {
    this.saveFile(modalData);
    this.showEditModal = false;
  }

  handleModalCancel() {
    this.showEditModal = false;
  }

  viewFile(file: Personnel201File) {
    this.selectedFile = file;
    this.showDetailsModal = true;
  }

  deleteFile(file: Personnel201File) {
    if (confirm(`Delete 201 file for ${file.employeeName}?`)) {
      this.personnelFiles = this.personnelFiles.filter(f => f.id !== file.id);
      // Log audit trail (in real app, log user info)
      file.auditTrail.push({
        action: 'delete',
        timestamp: new Date().toISOString(),
        user: 'admin',
        details: 'Deleted file'
      });
    }
  }

  saveFile(modalData: Personnel201ModalData) {
    const employeeName = [modalData.lastName, modalData.suffix, modalData.firstName, modalData.middleName]
      .filter(Boolean)
      .join(' ').replace(/\s+/g, ' ').trim();
    if (this.editMode === 'create') {
      const newFile: Personnel201File = {
        id: Date.now(),
        employeeName,
        firstName: modalData.firstName,
        middleName: modalData.middleName,
        lastName: modalData.lastName,
        suffix: modalData.suffix,
        email: modalData.email,
        number: modalData.number,
        address: modalData.address,
        department: modalData.department,
        position: modalData.position,
        dateCreated: new Date().toISOString().slice(0, 10),
        lastModified: new Date().toISOString().slice(0, 10),
        createdBy: 'admin',
        modifiedBy: 'admin',
        auditTrail: [
          { action: 'create', timestamp: new Date().toISOString(), user: 'admin', details: 'Created file' }
        ],
        fileName: modalData.file ? modalData.file.name : undefined,
        profilePictureUrl: modalData.profilePictureUrl || '',
        profilePictureFile: modalData.profilePictureFile || null,
        birthdate: modalData.birthdate || '',
        gender: modalData.gender || '',
        civilStatus: modalData.civilStatus || '',
        citizenship: modalData.citizenship || '',
        employmentType: modalData.employmentType || '',
        designation: modalData.designation || '',
        appointmentDate: modalData.appointmentDate || '',
        startDate: modalData.startDate || '',
        employmentStatus: modalData.employmentStatus || '',
        jobLevel: modalData.jobLevel || '',
        jobGrade: modalData.jobGrade || '',
        gsis: modalData.gsis || '',
        pagibig: modalData.pagibig || '',
        philhealth: modalData.philhealth || '',
        sss: modalData.sss || '',
        dependents: modalData.dependents || '',
        emergencyContactName: modalData.emergencyContactName || '',
        emergencyContactNumber: modalData.emergencyContactNumber || '',
        emergencyContactRelationship: modalData.emergencyContactRelationship || ''
      };
      this.personnelFiles.push(newFile);
    } else if (this.editMode === 'edit' && this.editFileData && (this.editFileData as any).id) {
      const idx = this.personnelFiles.findIndex(f => f.id === (this.editFileData as any).id);
      if (idx !== -1) {
        const oldFile = this.personnelFiles[idx];
        this.personnelFiles[idx] = {
          ...oldFile,
          employeeName,
          firstName: modalData.firstName,
          middleName: modalData.middleName,
          lastName: modalData.lastName,
          suffix: modalData.suffix,
          email: modalData.email,
          number: modalData.number,
          address: modalData.address,
          department: modalData.department,
          position: modalData.position,
          lastModified: new Date().toISOString().slice(0, 10),
          modifiedBy: 'admin',
          fileName: modalData.file ? modalData.file.name : oldFile.fileName,
          profilePictureUrl: modalData.profilePictureUrl || oldFile.profilePictureUrl || '',
          profilePictureFile: modalData.profilePictureFile || oldFile.profilePictureFile || null,
          birthdate: modalData.birthdate || oldFile.birthdate || '',
          gender: modalData.gender || oldFile.gender || '',
          civilStatus: modalData.civilStatus || oldFile.civilStatus || '',
          citizenship: modalData.citizenship || oldFile.citizenship || '',
          employmentType: modalData.employmentType || oldFile.employmentType || '',
          designation: modalData.designation || oldFile.designation || '',
          appointmentDate: modalData.appointmentDate || oldFile.appointmentDate || '',
          startDate: modalData.startDate || oldFile.startDate || '',
          employmentStatus: modalData.employmentStatus || oldFile.employmentStatus || '',
          jobLevel: modalData.jobLevel || oldFile.jobLevel || '',
          jobGrade: modalData.jobGrade || oldFile.jobGrade || '',
          gsis: modalData.gsis || oldFile.gsis || '',
          pagibig: modalData.pagibig || oldFile.pagibig || '',
          philhealth: modalData.philhealth || oldFile.philhealth || '',
          sss: modalData.sss || oldFile.sss || '',
          dependents: modalData.dependents || oldFile.dependents || '',
          emergencyContactName: modalData.emergencyContactName || oldFile.emergencyContactName || '',
          emergencyContactNumber: modalData.emergencyContactNumber || oldFile.emergencyContactNumber || '',
          emergencyContactRelationship: modalData.emergencyContactRelationship || oldFile.emergencyContactRelationship || ''
        };
        this.personnelFiles[idx].auditTrail.push({
          action: 'edit',
          timestamp: new Date().toISOString(),
          user: 'admin',
          details: 'Edited file'
        });
      }
    }
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedFile = null;
  }

  openCreateModal() {
    this.openEditModal('create');
  }

  editFile(file: any) {
    this.openEditModal('edit', file);
  }
} 