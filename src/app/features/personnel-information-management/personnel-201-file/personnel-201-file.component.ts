import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateEditModalComponent, Personnel201ModalData } from './create-edit-modal/create-edit-modal.component';
import { Personnel201Service, Personnel201File, PersonnelCreateRequest, PersonnelUpdateRequest } from './personnel-201.service';
import { DetailsAuditTrailModalComponent } from './details-audit-trail-modal/details-audit-trail-modal.component';
import { AuthService } from '../../../services/auth.service';

export interface AuditTrailEntry {
  action: 'create' | 'edit' | 'delete';
  timestamp: string;
  user: string;
  details: string;
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
  editFileData: Personnel201ModalData = this.getEmptyModalData();
  searchTerm: string = '';
  loading = false;
  error: string | null = null;

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalRecords = 0;
  totalPages = 0;

  // Make Math available in template
  Math = Math;

  constructor(
    private personnelService: Personnel201Service,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Debug: Check authentication status
    console.log('🔍 Component ngOnInit - Checking auth status...');
    console.log('🔍 Is authenticated:', this.authService.isAuthenticated());
    console.log('🔍 Current user:', this.authService.getCurrentUser());
    console.log('🔍 Token exists:', !!this.authService.getToken());
    
    this.loadPersonnelFiles();
  }

  private getEmptyModalData(): Personnel201ModalData {
    return {
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

  loadPersonnelFiles() {
    this.loading = true;
    this.error = null;

    // Debug: Log before making API call
    console.log('🚀 Making API call to load personnel files...');

    this.personnelService.getPersonnelFiles(
      this.currentPage, 
      this.pageSize, 
      this.searchTerm || undefined
    ).subscribe({
      next: (response) => {
        this.personnelFiles = response.data;
        this.totalRecords = response.pagination.total;
        this.totalPages = response.pagination.pages;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
        console.error('Error loading personnel files:', error);
      }
    });
  }

  onSearch() {
    this.currentPage = 1; // Reset to first page when searching
    this.loadPersonnelFiles();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadPersonnelFiles();
  }

  get filteredPersonnelFiles(): Personnel201File[] {
    // Since we're now doing server-side filtering, just return the loaded files
    return this.personnelFiles;
  }

  openEditModal(mode: 'create' | 'edit', data?: Personnel201File) {
    this.editMode = mode;
    if (mode === 'edit' && data) {
      this.editFileData = {
        firstName: data.firstName || '',
        middleName: data.middleName || '',
        lastName: data.lastName || '',
        suffix: '',
        email: data.email || '',
        number: data.contact_number || '',
        address: data.address || '',
        department: data.departmentName || '',
        position: data.designation || '',
        file: null,
        fileName: '',
        profilePictureUrl: data.profilePictureUrl || '',
        profilePictureFile: null,
        birthdate: data.date_of_birth || '',
        gender: data.gender || '',
        civilStatus: data.civil_status || '',
        citizenship: '',
        employmentType: data.employment_type || '',
        designation: data.designation || '',
        appointmentDate: data.date_hired || '',
        startDate: data.date_hired || '',
        employmentStatus: data.user?.status || '',
        jobLevel: '',
        jobGrade: '',
        gsis: data.gsis_number || '',
        pagibig: data.pagibig_number || '',
        philhealth: data.philhealth_number || '',
        sss: data.sss_number || '',
        dependents: '',
        emergencyContactName: '',
        emergencyContactNumber: '',
        emergencyContactRelationship: ''
      };
      (this.editFileData as any).id = data.id;
    } else {
      this.editFileData = this.getEmptyModalData();
    }
    this.showEditModal = true;
  }

  handleModalSave(modalData: Personnel201ModalData) {
    if (this.editMode === 'create') {
      this.createPersonnel(modalData);
    } else {
      this.updatePersonnel(modalData);
    }
    this.showEditModal = false;
  }

  private createPersonnel(modalData: Personnel201ModalData) {
    this.loading = true;
    this.error = null;

    const createRequest: PersonnelCreateRequest = {
      username: modalData.email || `${modalData.firstName?.toLowerCase()}.${modalData.lastName?.toLowerCase()}`,
      email: modalData.email || '',
      password: 'TempPassword123!', // Should be handled more securely
      first_name: modalData.firstName || '',
      last_name: modalData.lastName || '',
      middle_name: modalData.middleName || undefined,
      date_of_birth: modalData.birthdate || undefined,
      gender: modalData.gender || undefined,
      civil_status: modalData.civilStatus || undefined,
      contact_number: modalData.number || undefined,
      address: modalData.address || undefined,
      designation: modalData.designation || undefined,
      employment_type: modalData.employmentType || 'Regular',
      date_hired: modalData.startDate || new Date().toISOString().slice(0, 10),
      salary: 0, // Should be configurable
      gsis_number: modalData.gsis || undefined,
      pagibig_number: modalData.pagibig || undefined,
      philhealth_number: modalData.philhealth || undefined,
      sss_number: modalData.sss || undefined
    };

    this.personnelService.createPersonnel(createRequest).subscribe({
      next: () => {
        this.loadPersonnelFiles();
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
        console.error('Error creating personnel:', error);
      }
    });
  }

  private updatePersonnel(modalData: Personnel201ModalData) {
    const id = (this.editFileData as any).id;
    if (!id) return;

    this.loading = true;
    this.error = null;

    const updateRequest: PersonnelUpdateRequest = {
      first_name: modalData.firstName || undefined,
      last_name: modalData.lastName || undefined,
      middle_name: modalData.middleName || undefined,
      date_of_birth: modalData.birthdate || undefined,
      gender: modalData.gender || undefined,
      civil_status: modalData.civilStatus || undefined,
      contact_number: modalData.number || undefined,
      address: modalData.address || undefined,
      designation: modalData.designation || undefined,
      employment_type: modalData.employmentType || undefined,
      date_hired: modalData.startDate || undefined,
      gsis_number: modalData.gsis || undefined,
      pagibig_number: modalData.pagibig || undefined,
      philhealth_number: modalData.philhealth || undefined,
      sss_number: modalData.sss || undefined
    };

    this.personnelService.updatePersonnel(id, updateRequest).subscribe({
      next: () => {
        this.loadPersonnelFiles();
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
        console.error('Error updating personnel:', error);
      }
    });
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
      this.loading = true;
      this.error = null;

      this.personnelService.deletePersonnel(file.id).subscribe({
        next: () => {
          this.loadPersonnelFiles();
          this.loading = false;
        },
        error: (error) => {
          this.error = error.message;
          this.loading = false;
          console.error('Error deleting personnel:', error);
        }
      });
    }
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedFile = null;
  }

  openCreateModal() {
    this.openEditModal('create');
  }

  editFile(file: Personnel201File) {
    this.openEditModal('edit', file);
  }

  // Pagination helpers
  getPaginationArray(): number[] {
    const pages: number[] = [];
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, this.currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  goToFirstPage() {
    if (this.currentPage > 1) {
      this.onPageChange(1);
    }
  }

  goToLastPage() {
    if (this.currentPage < this.totalPages) {
      this.onPageChange(this.totalPages);
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.onPageChange(this.currentPage - 1);
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.onPageChange(this.currentPage + 1);
    }
  }
} 