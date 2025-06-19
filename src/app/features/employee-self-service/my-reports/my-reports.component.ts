import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ReportDocument {
  id: number;
  name: string;
  description: string;
  type: 'pdf' | 'doc' | 'excel' | 'image';
  dateGenerated: Date;
  size: string;
  downloadUrl?: string;
  isAvailable: boolean;
}

export interface RequestReport {
  id: number;
  requestType: string;
  dateFiled: Date;
  status: 'approved' | 'pending' | 'rejected' | 'cancelled';
  dateApproved?: Date;
  approvedBy?: string;
}

export interface ReportTab {
  id: string;
  label: string;
  count?: number;
}

export interface ReportFilter {
  year: number;
  requestType: string;
  status: string;
}

@Component({
  selector: 'app-my-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.scss']
})
export class MyReportsComponent implements OnInit {
  title = 'My Reports';
  
  // Make Math available in template
  Math = Math;
  
  // Active tab
  activeTab: string = 'my-reports';
  
  // Tab configuration
  tabs: ReportTab[] = [
    { id: 'my-reports', label: 'My Reports' },
    { id: 'company-reports', label: 'Company Reports' }
  ];

  // Search functionality
  searchTerm: string = '';
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  
  // Filters
  filters: ReportFilter = {
    year: new Date().getFullYear(),
    requestType: '',
    status: ''
  };
  
  // Available filter options
  availableYears: number[] = [];
  requestTypes = [
    'All Types',
    'Leave',
    'Overtime',
    'DTR Adjustment',
    'Certification',
    'Training Request',
    'Equipment Request'
  ];
  statusOptions = [
    'All Status',
    'Approved',
    'Pending',
    'Rejected',
    'Cancelled'
  ];

  // Modal states
  showDocumentModal: boolean = false;
  showRequestDetailModal: boolean = false;
  selectedDocument: ReportDocument | null = null;
  selectedRequest: RequestReport | null = null;

  // Documents data
  documents: ReportDocument[] = [
    {
      id: 1,
      name: 'Personal Data Sheet (PDS)',
      description: 'Contains personal information such as contact details, address, and educational background.',
      type: 'pdf',
      dateGenerated: new Date('2024-01-15'),
      size: '2.5 MB',
      downloadUrl: 'pds-2024.pdf',
      isAvailable: true
    },
    {
      id: 2,
      name: 'Service Record',
      description: 'Details of employment history, including positions held, salary, and tenure.',
      type: 'pdf',
      dateGenerated: new Date('2024-02-20'),
      size: '1.8 MB',
      downloadUrl: 'service-record-2024.pdf',
      isAvailable: true
    },
    {
      id: 3,
      name: 'Certificate of Employment',
      description: 'Official document verifying current employment status and details.',
      type: 'pdf',
      dateGenerated: new Date('2024-03-10'),
      size: '850 KB',
      downloadUrl: 'coe-2024.pdf',
      isAvailable: true
    },
    {
      id: 4,
      name: 'Summary of Leave Credits',
      description: 'Summary of available leave credits, including vacation and sick leaves.',
      type: 'excel',
      dateGenerated: new Date('2024-03-15'),
      size: '420 KB',
      downloadUrl: 'leave-credits-2024.xlsx',
      isAvailable: true
    },
    {
      id: 5,
      name: 'Payslip - March 2024',
      description: 'Monthly payslip containing salary breakdown and deductions.',
      type: 'pdf',
      dateGenerated: new Date('2024-03-31'),
      size: '650 KB',
      downloadUrl: 'payslip-march-2024.pdf',
      isAvailable: true
    },
    {
      id: 6,
      name: 'Performance Evaluation Report',
      description: 'Annual performance evaluation and assessment report.',
      type: 'pdf',
      dateGenerated: new Date('2024-01-30'),
      size: '1.2 MB',
      downloadUrl: 'performance-2023.pdf',
      isAvailable: true
    }
  ];

  // Request reports data
  requestReports: RequestReport[] = [
    {
      id: 1,
      requestType: 'Leave',
      dateFiled: new Date('2024-03-15'),
      status: 'approved',
      dateApproved: new Date('2024-03-16'),
      approvedBy: 'John Smith'
    },
    {
      id: 2,
      requestType: 'Overtime',
      dateFiled: new Date('2024-02-20'),
      status: 'approved',
      dateApproved: new Date('2024-02-21'),
      approvedBy: 'Jane Doe'
    },
    {
      id: 3,
      requestType: 'DTR Adjustment',
      dateFiled: new Date('2024-01-10'),
      status: 'approved',
      dateApproved: new Date('2024-01-12'),
      approvedBy: 'Mike Johnson'
    },
    {
      id: 4,
      requestType: 'Certification',
      dateFiled: new Date('2024-03-01'),
      status: 'pending',
      dateApproved: undefined,
      approvedBy: undefined
    },
    {
      id: 5,
      requestType: 'Training Request',
      dateFiled: new Date('2024-02-15'),
      status: 'rejected',
      dateApproved: new Date('2024-02-18'),
      approvedBy: 'Sarah Wilson'
    },
    {
      id: 6,
      requestType: 'Equipment Request',
      dateFiled: new Date('2024-01-25'),
      status: 'approved',
      dateApproved: new Date('2024-01-27'),
      approvedBy: 'Tom Brown'
    }
  ];

  ngOnInit() {
    this.initializeYears();
    this.updateTabCounts();
  }

  initializeYears() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 5; year--) {
      this.availableYears.push(year);
    }
  }

  // Tab management
  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.currentPage = 1;
  }

  updateTabCounts() {
    this.tabs.forEach(tab => {
      switch (tab.id) {
        case 'my-reports':
          tab.count = this.documents.length + this.requestReports.length;
          break;
        case 'company-reports':
          tab.count = 12; // Mock count for company reports
          break;
      }
    });
  }

  // Document management
  get filteredDocuments(): ReportDocument[] {
    let filtered = this.documents;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(term) ||
        doc.description.toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  get paginatedDocuments(): ReportDocument[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredDocuments.slice(start, end);
  }

  // Request reports filtering
  get filteredRequestReports(): RequestReport[] {
    let filtered = this.requestReports;

    // Filter by year
    if (this.filters.year) {
      filtered = filtered.filter(report => 
        report.dateFiled.getFullYear() === this.filters.year
      );
    }

    // Filter by request type
    if (this.filters.requestType && this.filters.requestType !== 'All Types') {
      filtered = filtered.filter(report => 
        report.requestType === this.filters.requestType
      );
    }

    // Filter by status
    if (this.filters.status && this.filters.status !== 'All Status') {
      filtered = filtered.filter(report => 
        report.status === this.filters.status.toLowerCase()
      );
    }

    // Filter by search term
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(report => 
        report.requestType.toLowerCase().includes(term) ||
        report.status.toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  get paginatedRequestReports(): RequestReport[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredRequestReports.slice(start, end);
  }

  // Pagination
  get totalPages(): number {
    if (this.activeTab === 'my-reports') {
      return Math.ceil(this.filteredDocuments.length / this.itemsPerPage);
    } else {
      return Math.ceil(this.filteredRequestReports.length / this.itemsPerPage);
    }
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }

  get hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  nextPage() {
    if (this.hasNextPage) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.hasPreviousPage) {
      this.currentPage--;
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Document actions
  viewDocument(document: ReportDocument) {
    this.selectedDocument = document;
    this.showDocumentModal = true;
  }

  closeDocumentModal() {
    this.showDocumentModal = false;
    this.selectedDocument = null;
  }

  downloadDocument(document: ReportDocument) {
    if (document.downloadUrl) {
      console.log(`Downloading document: ${document.downloadUrl}`);
      // Simulate download
      const link = window.document.createElement('a');
      link.href = '#'; // In real implementation, this would be the actual file URL
      link.download = document.downloadUrl;
      link.click();
    }
  }

  // Request report actions
  viewRequestReport(request: RequestReport) {
    this.selectedRequest = request;
    this.showRequestDetailModal = true;
  }

  closeRequestDetailModal() {
    this.showRequestDetailModal = false;
    this.selectedRequest = null;
  }

  // Filter methods
  onYearChange(year: number) {
    this.filters.year = year;
    this.currentPage = 1;
  }

  onRequestTypeChange(type: string) {
    this.filters.requestType = type;
    this.currentPage = 1;
  }

  onStatusChange(status: string) {
    this.filters.status = status;
    this.currentPage = 1;
  }

  clearFilters() {
    this.filters = {
      year: new Date().getFullYear(),
      requestType: '',
      status: ''
    };
    this.searchTerm = '';
    this.currentPage = 1;
  }

  // Utility methods
  getDocumentIcon(type: string): string {
    switch (type) {
      case 'pdf':
        return '📄';
      case 'doc':
        return '📝';
      case 'excel':
        return '📊';
      case 'image':
        return '🖼️';
      default:
        return '📄';
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'approved':
        return 'status-approved';
      case 'pending':
        return 'status-pending';
      case 'rejected':
        return 'status-rejected';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'approved':
        return '✓';
      case 'pending':
        return '⏳';
      case 'rejected':
        return '✗';
      case 'cancelled':
        return '⊘';
      default:
        return '?';
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  }

  formatFileSize(sizeStr: string): string {
    return sizeStr;
  }

  // Generate new reports (placeholder functionality)
  generateDocument(type: string) {
    console.log(`Generating ${type} document...`);
    // This would trigger actual document generation in a real application
  }
} 