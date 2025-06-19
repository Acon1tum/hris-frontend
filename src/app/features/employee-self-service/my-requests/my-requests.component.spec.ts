import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MyRequestsComponent, Request } from './my-requests.component';

describe('MyRequestsComponent', () => {
  let component: MyRequestsComponent;
  let fixture: ComponentFixture<MyRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRequestsComponent, FormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have proper title', () => {
      expect(component.title).toBe('My Requests');
    });

    it('should initialize with all tab active', () => {
      expect(component.activeTab).toBe('all');
    });

    it('should have sample requests data', () => {
      expect(component.requests.length).toBeGreaterThan(0);
    });

    it('should initialize with correct tab configuration', () => {
      expect(component.tabs.length).toBe(4);
      expect(component.tabs[0].id).toBe('all');
      expect(component.tabs[1].id).toBe('pending');
      expect(component.tabs[2].id).toBe('approved');
      expect(component.tabs[3].id).toBe('rejected');
    });

    it('should update tab counts on init', () => {
      component.ngOnInit();
      const allTab = component.tabs.find(t => t.id === 'all');
      expect(allTab?.count).toBe(component.requests.length);
    });
  });

  describe('Header Section', () => {
    it('should display page title', () => {
      const titleElement = fixture.debugElement.nativeElement.querySelector('.page-title');
      expect(titleElement.textContent).toBe('My Requests');
    });

    it('should display page description', () => {
      const descElement = fixture.debugElement.nativeElement.querySelector('.page-description');
      expect(descElement.textContent).toContain('Track and manage your submitted requests');
    });

    it('should display new request button', () => {
      const newButton = fixture.debugElement.nativeElement.querySelector('.btn-add');
      expect(newButton).toBeTruthy();
      expect(newButton.textContent).toContain('New Request');
    });
  });

  describe('Tab Navigation', () => {
    it('should render all tabs', () => {
      const tabs = fixture.debugElement.nativeElement.querySelectorAll('.tab-link');
      expect(tabs.length).toBe(4);
    });

    it('should highlight active tab', () => {
      const activeTab = fixture.debugElement.nativeElement.querySelector('.tab-active');
      expect(activeTab).toBeTruthy();
    });

    it('should switch tabs on click', () => {
      component.setActiveTab('pending');
      expect(component.activeTab).toBe('pending');
      expect(component.currentPage).toBe(1);
    });

    it('should display tab counts', () => {
      component.updateTabCounts();
      fixture.detectChanges();
      
      const tabCounts = fixture.debugElement.nativeElement.querySelectorAll('.tab-count');
      expect(tabCounts.length).toBeGreaterThan(0);
    });
  });

  describe('Search Functionality', () => {
    it('should filter requests by search term', () => {
      component.searchTerm = 'Leave';
      const filtered = component.filteredRequests;
      expect(filtered.every(r => 
        r.type.toLowerCase().includes('leave') ||
        r.remarks.toLowerCase().includes('leave') ||
        r.description?.toLowerCase().includes('leave')
      )).toBe(true);
    });

    it('should display search input', () => {
      const searchInput = fixture.debugElement.nativeElement.querySelector('.search-input');
      expect(searchInput).toBeTruthy();
    });

    it('should update filtered results when search term changes', () => {
      const initialCount = component.filteredRequests.length;
      component.searchTerm = 'NonexistentRequest';
      expect(component.filteredRequests.length).toBe(0);
      
      component.searchTerm = '';
      expect(component.filteredRequests.length).toBe(initialCount);
    });
  });

  describe('Tab Filtering', () => {
    it('should filter by pending status', () => {
      component.setActiveTab('pending');
      const filtered = component.filteredRequests;
      expect(filtered.every(r => r.status === 'pending')).toBe(true);
    });

    it('should filter by approved status', () => {
      component.setActiveTab('approved');
      const filtered = component.filteredRequests;
      expect(filtered.every(r => r.status === 'approved')).toBe(true);
    });

    it('should filter by rejected/cancelled status', () => {
      component.setActiveTab('rejected');
      const filtered = component.filteredRequests;
      expect(filtered.every(r => r.status === 'rejected' || r.status === 'cancelled')).toBe(true);
    });

    it('should show all requests for all tab', () => {
      component.setActiveTab('all');
      expect(component.filteredRequests.length).toBe(component.requests.length);
    });
  });

  describe('Pagination', () => {
    beforeEach(() => {
      component.itemsPerPage = 3; // Set small page size for testing
    });

    it('should calculate total pages correctly', () => {
      const expectedPages = Math.ceil(component.filteredRequests.length / component.itemsPerPage);
      expect(component.totalPages).toBe(expectedPages);
    });

    it('should return correct paginated requests', () => {
      component.currentPage = 1;
      const paginated = component.paginatedRequests;
      expect(paginated.length).toBeLessThanOrEqual(component.itemsPerPage);
    });

    it('should navigate to next page', () => {
      component.currentPage = 1;
      if (component.hasNextPage) {
        const initialPage = component.currentPage;
        component.nextPage();
        expect(component.currentPage).toBe(initialPage + 1);
      }
    });

    it('should navigate to previous page', () => {
      component.currentPage = 2;
      if (component.hasPreviousPage) {
        const initialPage = component.currentPage;
        component.previousPage();
        expect(component.currentPage).toBe(initialPage - 1);
      }
    });

    it('should not go beyond first page', () => {
      component.currentPage = 1;
      component.previousPage();
      expect(component.currentPage).toBe(1);
    });

    it('should not go beyond last page', () => {
      component.currentPage = component.totalPages;
      component.nextPage();
      expect(component.currentPage).toBe(component.totalPages);
    });

    it('should go to specific page', () => {
      component.goToPage(2);
      expect(component.currentPage).toBe(2);
    });

    it('should not go to invalid page numbers', () => {
      const currentPage = component.currentPage;
      component.goToPage(0);
      expect(component.currentPage).toBe(currentPage);
      
      component.goToPage(component.totalPages + 1);
      expect(component.currentPage).toBe(currentPage);
    });
  });

  describe('Requests Table', () => {
    it('should display requests table when there are requests', () => {
      const table = fixture.debugElement.nativeElement.querySelector('.requests-table');
      expect(table).toBeTruthy();
    });

    it('should display correct number of table rows', () => {
      const rows = fixture.debugElement.nativeElement.querySelectorAll('.table-row');
      expect(rows.length).toBe(component.paginatedRequests.length);
    });

    it('should display request data in cells', () => {
      const firstRow = fixture.debugElement.nativeElement.querySelector('.table-row');
      if (firstRow && component.paginatedRequests.length > 0) {
        const request = component.paginatedRequests[0];
        expect(firstRow.textContent).toContain(request.type);
        expect(firstRow.textContent).toContain(request.status);
      }
    });

    it('should show status badges with correct styling', () => {
      const statusBadges = fixture.debugElement.nativeElement.querySelectorAll('.status-badge');
      expect(statusBadges.length).toBeGreaterThan(0);
    });

    it('should show priority badges', () => {
      const priorityBadges = fixture.debugElement.nativeElement.querySelectorAll('.priority-badge');
      expect(priorityBadges.length).toBeGreaterThan(0);
    });
  });

  describe('Empty State', () => {
    it('should display empty state when no requests match filter', () => {
      component.searchTerm = 'NonexistentRequest';
      fixture.detectChanges();
      
      const emptyState = fixture.debugElement.nativeElement.querySelector('.empty-state');
      expect(emptyState).toBeTruthy();
    });

    it('should display appropriate empty state message for search', () => {
      component.searchTerm = 'NonexistentRequest';
      fixture.detectChanges();
      
      const emptyDescription = fixture.debugElement.nativeElement.querySelector('.empty-description');
      expect(emptyDescription.textContent).toContain('No requests match your search criteria');
    });
  });

  describe('New Request Modal', () => {
    it('should open new request modal', () => {
      component.openNewRequestModal();
      expect(component.showNewRequestModal).toBe(true);
    });

    it('should close new request modal', () => {
      component.openNewRequestModal();
      component.closeNewRequestModal();
      expect(component.showNewRequestModal).toBe(false);
    });

    it('should reset form when modal is closed', () => {
      component.newRequest.type = 'Leave';
      component.newRequest.description = 'Test';
      component.closeNewRequestModal();
      
      expect(component.newRequest.type).toBe('');
      expect(component.newRequest.description).toBe('');
    });

    it('should display new request modal when shown', () => {
      component.showNewRequestModal = true;
      fixture.detectChanges();
      
      const modal = fixture.debugElement.nativeElement.querySelector('.modal-overlay');
      expect(modal).toBeTruthy();
    });

    it('should create new request with valid data', () => {
      component.newRequest = {
        type: 'Leave',
        description: 'Test leave request',
        priority: 'medium',
        attachment: ''
      };
      
      const initialCount = component.requests.length;
      component.createNewRequest();
      
      expect(component.requests.length).toBe(initialCount + 1);
      expect(component.showNewRequestModal).toBe(false);
    });

    it('should not create request with invalid data', () => {
      component.newRequest = {
        type: '',
        description: '',
        priority: 'medium',
        attachment: ''
      };
      
      const initialCount = component.requests.length;
      component.createNewRequest();
      
      expect(component.requests.length).toBe(initialCount);
    });
  });

  describe('Request Detail Modal', () => {
    let sampleRequest: Request;

    beforeEach(() => {
      sampleRequest = component.requests[0];
    });

    it('should open request detail modal', () => {
      component.viewRequest(sampleRequest);
      expect(component.showRequestDetailModal).toBe(true);
      expect(component.selectedRequest).toBe(sampleRequest);
    });

    it('should close request detail modal', () => {
      component.viewRequest(sampleRequest);
      component.closeRequestDetailModal();
      expect(component.showRequestDetailModal).toBe(false);
      expect(component.selectedRequest).toBeNull();
    });

    it('should display request details in modal', () => {
      component.selectedRequest = sampleRequest;
      component.showRequestDetailModal = true;
      fixture.detectChanges();
      
      const modalContent = fixture.debugElement.nativeElement.querySelector('.modal-content');
      expect(modalContent.textContent).toContain(sampleRequest.type);
    });
  });

  describe('Request Actions', () => {
    it('should cancel pending request', () => {
      const pendingRequest = component.requests.find(r => r.status === 'pending');
      if (pendingRequest) {
        const originalStatus = pendingRequest.status;
        component.cancelRequest(pendingRequest.id);
        expect(pendingRequest.status).toBe('cancelled');
        expect(pendingRequest.status).not.toBe(originalStatus);
      }
    });

    it('should not cancel non-pending request', () => {
      const approvedRequest = component.requests.find(r => r.status === 'approved');
      if (approvedRequest) {
        const originalStatus = approvedRequest.status;
        component.cancelRequest(approvedRequest.id);
        expect(approvedRequest.status).toBe(originalStatus);
      }
    });

    it('should determine if request can be cancelled', () => {
      const pendingRequest = component.requests.find(r => r.status === 'pending');
      const approvedRequest = component.requests.find(r => r.status === 'approved');
      
      if (pendingRequest) {
        expect(component.canCancelRequest(pendingRequest)).toBe(true);
      }
      
      if (approvedRequest) {
        expect(component.canCancelRequest(approvedRequest)).toBe(false);
      }
    });

    it('should simulate attachment download', () => {
      spyOn(console, 'log');
      const filename = 'test-file.pdf';
      
      component.downloadAttachment(filename);
      
      expect(console.log).toHaveBeenCalledWith(`Downloading attachment: ${filename}`);
    });
  });

  describe('Utility Methods', () => {
    it('should return correct status badge class', () => {
      expect(component.getStatusBadgeClass('approved')).toBe('status-approved');
      expect(component.getStatusBadgeClass('pending')).toBe('status-pending');
      expect(component.getStatusBadgeClass('rejected')).toBe('status-rejected');
      expect(component.getStatusBadgeClass('cancelled')).toBe('status-cancelled');
      expect(component.getStatusBadgeClass('unknown')).toBe('status-default');
    });

    it('should return correct priority badge class', () => {
      expect(component.getPriorityBadgeClass('high')).toBe('priority-high');
      expect(component.getPriorityBadgeClass('medium')).toBe('priority-medium');
      expect(component.getPriorityBadgeClass('low')).toBe('priority-low');
      expect(component.getPriorityBadgeClass('unknown')).toBe('priority-default');
    });

    it('should format date correctly', () => {
      const testDate = new Date('2023-08-15');
      const formatted = component.formatDate(testDate);
      expect(formatted).toContain('Aug');
      expect(formatted).toContain('15');
      expect(formatted).toContain('2023');
    });

    it('should return correct status icon', () => {
      expect(component.getStatusIcon('approved')).toBe('✓');
      expect(component.getStatusIcon('pending')).toBe('⏳');
      expect(component.getStatusIcon('rejected')).toBe('✗');
      expect(component.getStatusIcon('cancelled')).toBe('⊘');
      expect(component.getStatusIcon('unknown')).toBe('?');
    });
  });

  describe('Tab Count Updates', () => {
    it('should update tab counts when requests change', () => {
      const initialPendingCount = component.requests.filter(r => r.status === 'pending').length;
      
      // Add a new pending request
      const newRequest: Request = {
        id: 999,
        type: 'Test',
        dateFiled: new Date(),
        status: 'pending',
        remarks: 'Test',
        description: 'Test request'
      };
      
      component.requests.push(newRequest);
      component.updateTabCounts();
      
      const pendingTab = component.tabs.find(t => t.id === 'pending');
      expect(pendingTab?.count).toBe(initialPendingCount + 1);
    });

    it('should update all tab counts correctly', () => {
      component.updateTabCounts();
      
      const allTab = component.tabs.find(t => t.id === 'all');
      const pendingTab = component.tabs.find(t => t.id === 'pending');
      const approvedTab = component.tabs.find(t => t.id === 'approved');
      const rejectedTab = component.tabs.find(t => t.id === 'rejected');
      
      expect(allTab?.count).toBe(component.requests.length);
      expect(pendingTab?.count).toBe(component.requests.filter(r => r.status === 'pending').length);
      expect(approvedTab?.count).toBe(component.requests.filter(r => r.status === 'approved').length);
      expect(rejectedTab?.count).toBe(component.requests.filter(r => r.status === 'rejected' || r.status === 'cancelled').length);
    });
  });

  describe('Form Validation', () => {
    it('should have default form values', () => {
      expect(component.newRequest.type).toBe('');
      expect(component.newRequest.description).toBe('');
      expect(component.newRequest.priority).toBe('medium');
      expect(component.newRequest.attachment).toBe('');
    });

    it('should reset form to default values', () => {
      component.newRequest.type = 'Leave';
      component.newRequest.description = 'Test';
      component.newRequest.priority = 'high';
      component.newRequest.attachment = 'file.pdf';
      
      component.resetNewRequestForm();
      
      expect(component.newRequest.type).toBe('');
      expect(component.newRequest.description).toBe('');
      expect(component.newRequest.priority).toBe('medium');
      expect(component.newRequest.attachment).toBe('');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty requests array', () => {
      component.requests = [];
      component.updateTabCounts();
      
      expect(component.filteredRequests.length).toBe(0);
      expect(component.paginatedRequests.length).toBe(0);
      expect(component.totalPages).toBe(0);
    });

    it('should handle requests without optional fields', () => {
      const minimalRequest: Request = {
        id: 999,
        type: 'Minimal',
        dateFiled: new Date(),
        status: 'pending',
        remarks: 'Basic request'
      };
      
      component.requests = [minimalRequest];
      
      expect(component.filteredRequests.length).toBe(1);
      expect(component.getPriorityBadgeClass(minimalRequest.priority || 'medium')).toBe('priority-medium');
    });

    it('should handle search with special characters', () => {
      component.searchTerm = '!@#$%';
      expect(component.filteredRequests.length).toBe(0);
    });

    it('should handle very long search terms', () => {
      component.searchTerm = 'a'.repeat(1000);
      expect(component.filteredRequests.length).toBe(0);
    });
  });
}); 