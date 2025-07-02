import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface LeaveApplication {
  type: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  status: string;
  reason?: string;
  documentName?: string;
}

@Component({
  selector: 'app-leave-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leave-employee.component.html',
  styleUrls: ['./leave-employee.component.scss']
})
export class LeaveEmployeeComponent {
  leaves: LeaveApplication[] = [
    {
      type: 'Vacation Leave',
      startDate: '2025-06-25',
      endDate: '2025-06-27',
      totalDays: 3,
      status: 'Pending',
      reason: 'Family trip',
      documentName: ''
    },
    {
      type: 'Sick Leave',
      startDate: '2025-07-01',
      endDate: '2025-07-02',
      totalDays: 2,
      status: 'Approved',
      reason: 'Fever',
      documentName: ''
    }
  ];

  // Dashboard metrics
  totalLeaves = 0;
  pendingLeaves = 0;
  approvedLeaves = 0;
  cancelledLeaves = 0;
  totalDaysTaken = 0;
  mostUsedType = '';

  leaveTypes: string[] = ['Vacation Leave', 'Sick Leave', 'Emergency Leave'];

  form: any = {
    leaveType: '',
    startDate: '',
    endDate: '',
    totalDays: 0,
    reason: '',
    document: null,
    documentName: ''
  };

  showApplyForm = false;
  showViewModal = false;
  selectedLeave: LeaveApplication | null = null;
  validationErrors: any = {};
  formSubmitted = false;
  showSuccessModal = false;
  isSubmitting = false;

  constructor() {
    this.updateMetrics();
  }

  updateMetrics() {
    this.totalLeaves = this.leaves.length;
    this.pendingLeaves = this.leaves.filter(l => l.status === 'Pending').length;
    this.approvedLeaves = this.leaves.filter(l => l.status === 'Approved').length;
    this.cancelledLeaves = this.leaves.filter(l => l.status === 'Cancelled').length;
    this.totalDaysTaken = this.leaves
      .filter(l => l.status === 'Approved')
      .reduce((sum, l) => sum + (l.totalDays || 0), 0);
    // Compute most used leave type
    const typeCount: Record<string, number> = {};
    for (const leave of this.leaves) {
      if (!typeCount[leave.type]) typeCount[leave.type] = 0;
      typeCount[leave.type]++;
    }
    let max = 0;
    let mostUsed = '';
    for (const type in typeCount) {
      if (typeCount[type] > max) {
        max = typeCount[type];
        mostUsed = type;
      }
    }
    this.mostUsedType = mostUsed || 'N/A';
  }

  onApplyLeave() {
    this.resetForm();
    this.showApplyForm = true;
  }

  onViewLeave(leave: LeaveApplication) {
    this.selectedLeave = leave;
    this.showViewModal = true;
  }

  onCancelLeave(leave: LeaveApplication) {
    if (leave.status === 'Pending') {
      if (confirm('Are you sure you want to cancel this leave application?')) {
        leave.status = 'Cancelled';
        this.updateMetrics();
      }
    }
  }

  updateTotalDays() {
    if (this.form.startDate && this.form.endDate) {
      const start = new Date(this.form.startDate);
      const end = new Date(this.form.endDate);
      const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
      this.form.totalDays = diff > 0 ? diff : 0;
    } else {
      this.form.totalDays = 0;
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.document = file;
      this.form.documentName = file.name;
    } else {
      this.form.document = null;
      this.form.documentName = '';
    }
  }

  validateForm(): boolean {
    this.validationErrors = {};
    let valid = true;
    if (!this.form.leaveType) {
      this.validationErrors.leaveType = 'Leave type is required.';
      valid = false;
    }
    if (!this.form.startDate) {
      this.validationErrors.startDate = 'Start date is required.';
      valid = false;
    }
    if (!this.form.endDate) {
      this.validationErrors.endDate = 'End date is required.';
      valid = false;
    }
    if (!this.form.reason || !this.form.reason.trim()) {
      this.validationErrors.reason = 'Reason is required.';
      valid = false;
    }
    // Additional: End date must not be before start date
    if (this.form.startDate && this.form.endDate) {
      if (new Date(this.form.endDate) < new Date(this.form.startDate)) {
        this.validationErrors.endDate = 'End date cannot be before start date.';
        valid = false;
      }
    }
    return valid;
  }

  submitLeaveApplication() {
    this.formSubmitted = true;
    if (!this.validateForm()) {
      return;
    }
    this.isSubmitting = true;
    // Simulate loading/progress (e.g. 1.5s)
    setTimeout(() => {
      this.isSubmitting = false;
      this.showSuccessModal = true;
      const newLeave: LeaveApplication = {
        type: this.form.leaveType,
        startDate: this.form.startDate,
        endDate: this.form.endDate,
        totalDays: this.form.totalDays,
        status: 'Pending',
        reason: this.form.reason,
        documentName: this.form.documentName
      };
      this.leaves.unshift(newLeave);
      this.showApplyForm = false;
      this.resetForm();
      this.updateMetrics();
      this.formSubmitted = false;
      // Auto-close success modal after 1.5s
      setTimeout(() => {
        this.showSuccessModal = false;
      }, 1500);
    }, 1500);
  }

  resetForm() {
    this.form = {
      leaveType: '',
      startDate: '',
      endDate: '',
      totalDays: 0,
      reason: '',
      document: null,
      documentName: ''
    };
    this.formSubmitted = false;
  }

  getFileType(filename: string | undefined): string {
    if (!filename) return 'other';
    const ext = filename.split('.').pop()?.toLowerCase();
    if (!ext) return 'other';
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(ext)) return 'image';
    if (['pdf'].includes(ext)) return 'pdf';
    if (['doc', 'docx', 'odt', 'rtf'].includes(ext)) return 'doc';
    return 'other';
  }

  getFileUrl(filename: string | undefined): string {
    if (!filename) return '';
    if (filename.startsWith('data:')) return filename;
    return '/assets/uploads/' + filename;
  }
}
