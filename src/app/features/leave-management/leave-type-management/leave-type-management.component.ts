import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface LeaveType {
  id: number;
  name: string;
  description: string;
  category?: string;
}

@Component({
  selector: 'app-leave-type-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leave-type-management.component.html',
  styleUrls: ['./leave-type-management.component.scss']
})
export class LeaveTypeManagementComponent {
  searchTerm = '';

  leaveTypes: LeaveType[] = [
    {
      id: 1,
      name: 'Vacation Leave',
      description: 'Paid time off for employees to use for vacations or personal time.',
      category: 'Paid'
    },
    {
      id: 2,
      name: 'Sick Leave',
      description: 'Paid time off for employees to use when they are ill or need to care for a sick family member.',
      category: 'Paid'
    },
    {
      id: 3,
      name: 'Personal Leave',
      description: 'Unpaid time off for employees to use for personal reasons.',
      category: 'Unpaid'
    },
    {
      id: 4,
      name: 'Maternity Leave',
      description: 'Extended leave for new mothers as mandated by law.',
      category: 'Special'
    },
    {
      id: 5,
      name: 'Paternity Leave',
      description: 'Leave for new fathers to bond with their newborn child.',
      category: 'Special'
    }
  ];

  // Pagination properties
  currentPage = 1;
  itemsPerPage = 10;

  leaveTypeOptions = ['Vacation Leave', 'Sick Leave', 'Emergency Leave'];

  showAddModal = false;
  addForm = { type: '', reason: '' };
  addValidation: any = {};

  // Edit modal state
  showEditModal = false;
  editForm: any = { id: null, type: '', reason: '' };
  editValidation: any = {};

  // Delete confirmation modal state
  showDeleteModal = false;
  leaveTypeToDelete: LeaveType | null = null;

  // Toast notification state (optional)
  toast = { show: false, message: '', type: '' };
  toastTimeout: any = null;

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.currentPage = 1; // Reset to first page when searching
  }

  onAddLeaveType() {
    this.addForm = { type: '', reason: '' };
    this.addValidation = {};
    this.showAddModal = true;
  }

  onEditLeaveType(leaveType: LeaveType) {
    this.editForm = { id: leaveType.id, type: leaveType.name, reason: leaveType.description };
    this.editValidation = {};
    this.showEditModal = true;
  }

  onDeleteLeaveType(leaveType: LeaveType) {
    this.leaveTypeToDelete = leaveType;
    this.showDeleteModal = true;
  }

  validateAddForm(): boolean {
    this.addValidation = {};
    let valid = true;
    if (!this.addForm.type) {
      this.addValidation.type = 'Leave type is required.';
      valid = false;
    }
    if (!this.addForm.reason.trim()) {
      this.addValidation.reason = 'Reason is required.';
      valid = false;
    }
    return valid;
  }

  submitAddLeaveType() {
    if (!this.validateAddForm()) return;
    const newId = this.leaveTypes.length ? Math.max(...this.leaveTypes.map(l => l.id)) + 1 : 1;
    this.leaveTypes.unshift({
      id: newId,
      name: this.addForm.type,
      description: this.addForm.reason
    });
    this.showAddModal = false;
  }

  validateEditForm(): boolean {
    this.editValidation = {};
    let valid = true;
    if (!this.editForm.type) {
      this.editValidation.type = 'Leave type is required.';
      valid = false;
    }
    if (!this.editForm.reason.trim()) {
      this.editValidation.reason = 'Reason is required.';
      valid = false;
    }
    return valid;
  }

  submitEditLeaveType() {
    if (!this.validateEditForm()) return;
    const idx = this.leaveTypes.findIndex(l => l.id === this.editForm.id);
    if (idx !== -1) {
      this.leaveTypes[idx].name = this.editForm.type;
      this.leaveTypes[idx].description = this.editForm.reason;
      this.showEditModal = false;
      this.showToast('Leave type updated successfully!', 'success');
    }
  }

  confirmDeleteLeaveType() {
    if (this.leaveTypeToDelete) {
      this.leaveTypes = this.leaveTypes.filter(l => l.id !== this.leaveTypeToDelete!.id);
      this.showDeleteModal = false;
      this.leaveTypeToDelete = null;
      this.showToast('Leave type deleted successfully!', 'success');
    }
  }

  cancelDeleteLeaveType() {
    this.showDeleteModal = false;
    this.leaveTypeToDelete = null;
  }

  showToast(message: string, type: string = 'info', duration: number = 2000) {
    this.toast.show = true;
    this.toast.message = message;
    this.toast.type = type;
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.toastTimeout = setTimeout(() => {
      this.toast.show = false;
    }, duration);
  }

  get filteredLeaveTypes() {
    if (!this.searchTerm) {
      return this.leaveTypes;
    }
    return this.leaveTypes.filter(leaveType => 
      leaveType.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      leaveType.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedLeaveTypes() {
    const filtered = this.filteredLeaveTypes;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.filteredLeaveTypes.length / this.itemsPerPage);
  }

  get displayStart() {
    if (this.filteredLeaveTypes.length === 0) return 0;
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get displayEnd() {
    const end = this.currentPage * this.itemsPerPage;
    return Math.min(end, this.filteredLeaveTypes.length);
  }

  get displayTotal() {
    return this.filteredLeaveTypes.length;
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  get canGoToPrevious() {
    return this.currentPage > 1;
  }

  get canGoToNext() {
    return this.currentPage < this.totalPages;
  }

  trackByLeaveTypeId(index: number, leaveType: LeaveType): number {
    return leaveType.id;
  }
} 