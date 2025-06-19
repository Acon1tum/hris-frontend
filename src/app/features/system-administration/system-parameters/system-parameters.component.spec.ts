import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemParametersComponent } from './system-parameters.component';

describe('SystemParametersComponent', () => {
  let component: SystemParametersComponent;
  let fixture: ComponentFixture<SystemParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemParametersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.searchTerm).toBe('');
    expect(component.activeTab).toBe('leave-types');
    expect(component.currentPage).toBe(1);
    expect(component.itemsPerPage).toBe(10);
    expect(component.tabs.length).toBe(6);
    expect(component.leaveTypes.length).toBeGreaterThan(0);
  });

  it('should have leave types tab active by default', () => {
    const activeTab = component.tabs.find(tab => tab.active);
    expect(activeTab?.id).toBe('leave-types');
    expect(activeTab?.name).toBe('Leave Types');
  });

  it('should change active tab when onTabChange is called', () => {
    component.onTabChange('dtr-adjustments');
    
    const activeTab = component.tabs.find(tab => tab.active);
    expect(activeTab?.id).toBe('dtr-adjustments');
    expect(component.activeTab).toBe('dtr-adjustments');
    
    // Should clear search term when switching tabs
    expect(component.searchTerm).toBe('');
    expect(component.currentPage).toBe(1);
  });

  it('should filter leave types based on search term', () => {
    const initialCount = component.filteredLeaveTypes.length;
    
    // Mock search event
    const mockEvent = {
      target: { value: 'Vacation' }
    } as any;
    
    component.onSearch(mockEvent);
    
    expect(component.searchTerm).toBe('Vacation');
    expect(component.filteredLeaveTypes.length).toBeLessThanOrEqual(initialCount);
    expect(component.filteredLeaveTypes.every(lt => 
      lt.name.toLowerCase().includes('vacation') || 
      lt.description.toLowerCase().includes('vacation')
    )).toBeTruthy();
  });

  it('should reset to first page when searching', () => {
    component.currentPage = 3;
    
    const mockEvent = {
      target: { value: 'test' }
    } as any;
    
    component.onSearch(mockEvent);
    expect(component.currentPage).toBe(1);
  });

  it('should handle pagination correctly', () => {
    // Test next page
    component.currentPage = 1;
    component.onNextPage();
    
    if (component.totalPages > 1) {
      expect(component.currentPage).toBe(2);
    }
    
    // Test previous page
    component.currentPage = 2;
    component.onPreviousPage();
    expect(component.currentPage).toBe(1);
  });

  it('should correctly calculate pagination properties', () => {
    component.searchTerm = '';
    component.currentPage = 1;
    
    expect(component.displayStart).toBeGreaterThan(0);
    expect(component.displayEnd).toBeGreaterThanOrEqual(component.displayStart);
    expect(component.displayTotal).toBe(component.leaveTypes.length);
  });

  it('should return correct pagination state', () => {
    component.currentPage = 1;
    expect(component.canGoToPrevious).toBeFalsy();
    
    if (component.totalPages > 1) {
      expect(component.canGoToNext).toBeTruthy();
    }
  });

  it('should call appropriate methods for CRUD operations', () => {
    spyOn(console, 'log');
    
    // Test add leave type
    component.onAddLeaveType();
    expect(console.log).toHaveBeenCalledWith('Add leave type clicked');
    
    // Test edit leave type
    const testLeaveType = component.leaveTypes[0];
    component.onEditLeaveType(testLeaveType);
    expect(console.log).toHaveBeenCalledWith('Edit leave type:', testLeaveType.name);
    
    // Test delete leave type
    component.onDeleteLeaveType(testLeaveType);
    expect(console.log).toHaveBeenCalledWith('Delete leave type:', testLeaveType.name);
  });

  it('should track leave types by id', () => {
    const leaveType = component.leaveTypes[0];
    expect(component.trackByLeaveTypeId(0, leaveType)).toBe(leaveType.id);
  });

  it('should return paginated leave types', () => {
    component.searchTerm = '';
    component.currentPage = 1;
    component.itemsPerPage = 2;
    
    const paginated = component.paginatedLeaveTypes;
    expect(paginated.length).toBeLessThanOrEqual(2);
  });

  it('should handle empty search results', () => {
    const mockEvent = {
      target: { value: 'nonexistentleave' }
    } as any;
    
    component.onSearch(mockEvent);
    expect(component.filteredLeaveTypes.length).toBe(0);
    expect(component.displayStart).toBe(0);
    expect(component.displayTotal).toBe(0);
  });

  it('should not go to previous page if already on first page', () => {
    component.currentPage = 1;
    component.onPreviousPage();
    expect(component.currentPage).toBe(1);
  });

  it('should not go to next page if already on last page', () => {
    component.currentPage = component.totalPages;
    component.onNextPage();
    expect(component.currentPage).toBe(component.totalPages);
  });
}); 