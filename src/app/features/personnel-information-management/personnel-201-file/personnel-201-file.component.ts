// Personnel 201 File Component with Dynamic Departments
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateEditModalComponent, Personnel201ModalData, Department } from './create-edit-modal/create-edit-modal.component';
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

  // Departments
  public departments: Department[] = [];
  public departmentsLoading: boolean = false;

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
    this.loadDepartments();
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
      emergencyContactRelationship: '',
      tin_number: '',
      username: '',
      password: '',
      confirmPassword: '',
      profilePictureBase64: undefined
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

  loadDepartments() {
    this.departmentsLoading = true;
    console.log('🏢 Loading departments...');

    this.personnelService.getDepartments().subscribe({
      next: (departments: {id: string, department_name: string}[]) => {
        this.departments = departments;
        this.departmentsLoading = false;
        console.log('✅ Departments loaded:', departments);
      },
      error: (error: any) => {
        console.error('❌ Error loading departments:', error);
        this.departmentsLoading = false;
        // Don't set main error here as it's not critical for viewing personnel
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
        citizenship: data.citizenship || '',
        employmentType: data.employment_type || '',
        designation: data.designation || '',
        appointmentDate: data.date_hired || '',
        startDate: data.date_hired || '',
        employmentStatus: data.user?.status || '',
        jobLevel: data.jobLevel || '',
        jobGrade: data.jobGrade || '',
        gsis: data.gsis_number || '',
        pagibig: data.pagibig_number || '',
        philhealth: data.philhealth_number || '',
        sss: data.sss_number || '',
        dependents: data.dependents || '',
        emergencyContactName: data.emergencyContactName || '',
        emergencyContactNumber: data.emergencyContactNumber || '',
        emergencyContactRelationship: data.emergencyContactRelationship || '',
        tin_number: data.tin_number || '',
        username: data.user?.username || '',
        password: '',
        confirmPassword: '',
        profilePictureBase64: undefined
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

  private async createPersonnel(modalData: Personnel201ModalData) {
    this.loading = true;
    this.error = null;

    try {
      // Generate unique username to avoid conflicts
      const baseUsername = modalData.email?.split('@')[0] || 
                          `${modalData.firstName?.toLowerCase()}.${modalData.lastName?.toLowerCase()}`;
      const username = baseUsername;

      // Map department name to department_id
      let department_id: string | undefined = undefined;
      if (modalData.department) {
        department_id = await this.personnelService.getDepartmentIdByName(modalData.department);
        if (!department_id) {
          console.warn('Department mapping not found for:', modalData.department);
          // Continue without department_id for now
        } else {
          console.log('✅ Department mapped successfully:', modalData.department, '→', department_id);
        }
      }

      // Set a reasonable default salary or make it configurable
      const defaultSalary = 25000; // Default starting salary

      const createRequest: any = {
        username: username,
        email: modalData.email || '',
        password: 'TempPassword123!', // TODO: Implement proper password generation
        first_name: modalData.firstName || '',
        last_name: modalData.lastName || '',
        middle_name: modalData.middleName || undefined,
        date_of_birth: modalData.birthdate || undefined,
        gender: modalData.gender || undefined,
        civil_status: modalData.civilStatus || undefined,
        contact_number: modalData.number || undefined,
        address: modalData.address || undefined,
        department_id: department_id, // Fixed: Now properly mapping department
        designation: modalData.designation || modalData.position || undefined,
        employment_type: modalData.employmentType || 'Regular',
        date_hired: modalData.startDate || modalData.appointmentDate || new Date().toISOString().slice(0, 10),
        salary: defaultSalary, // Fixed: Using reasonable default instead of 0
        gsis_number: modalData.gsis || undefined,
        pagibig_number: modalData.pagibig || undefined,
        philhealth_number: modalData.philhealth || undefined,
        sss_number: modalData.sss || undefined,
        tin_number: modalData.tin_number || undefined // Fixed: Added missing TIN number
      };
      if (modalData.profilePictureBase64) {
        createRequest.profile_picture = modalData.profilePictureBase64;
      }

      console.log('🚀 Creating personnel with data:', createRequest);

      this.personnelService.createPersonnel(createRequest).subscribe({
        next: () => {
          console.log('✅ Personnel created successfully');
          this.loadPersonnelFiles();
          this.loading = false;
        },
        error: (error) => {
          this.error = error.message;
          this.loading = false;
          console.error('❌ Error creating personnel:', error);
        }
      });
    } catch (error) {
      this.error = 'Failed to create personnel. Please try again.';
      this.loading = false;
      console.error('❌ Error in createPersonnel:', error);
    }
  }

  private async updatePersonnel(modalData: Personnel201ModalData) {
    const id = (this.editFileData as any).id;
    if (!id) return;

    this.loading = true;
    this.error = null;

    try {
      // Map department name to department_id (same logic as create)
      let department_id: string | undefined = undefined;
      if (modalData.department) {
        department_id = await this.personnelService.getDepartmentIdByName(modalData.department);
        if (!department_id) {
          console.warn('Department mapping not found for:', modalData.department);
          // Continue without department_id for now
        } else {
          console.log('✅ Department mapped successfully for update:', modalData.department, '→', department_id);
        }
      }

      const updateRequest: PersonnelUpdateRequest = {
        first_name: modalData.firstName || undefined,
        last_name: modalData.lastName || undefined,
        middle_name: modalData.middleName || undefined,
        date_of_birth: modalData.birthdate || undefined,
        gender: modalData.gender || undefined,
        civil_status: modalData.civilStatus || undefined,
        contact_number: modalData.number || undefined,
        address: modalData.address || undefined,
        department_id: department_id, // Fixed: Now properly mapping department
        designation: modalData.designation || modalData.position || undefined,
        employment_type: modalData.employmentType || undefined,
        date_hired: modalData.startDate || modalData.appointmentDate || undefined,
        gsis_number: modalData.gsis || undefined,
        pagibig_number: modalData.pagibig || undefined,
        philhealth_number: modalData.philhealth || undefined,
        sss_number: modalData.sss || undefined,
        tin_number: modalData.tin_number || undefined // Fixed: Added missing TIN number
      };

      console.log('🚀 Updating personnel with data:', updateRequest);

      this.personnelService.updatePersonnel(id, updateRequest).subscribe({
        next: () => {
          console.log('✅ Personnel updated successfully');
          this.loadPersonnelFiles();
          this.loading = false;
        },
        error: (error) => {
          this.error = error.message;
          this.loading = false;
          console.error('❌ Error updating personnel:', error);
        }
      });
    } catch (error) {
      this.error = 'Failed to update personnel. Please try again.';
      this.loading = false;
      console.error('❌ Error in updatePersonnel:', error);
    }
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