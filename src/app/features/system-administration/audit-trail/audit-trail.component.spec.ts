import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditTrailComponent } from './audit-trail.component';

describe('AuditTrailComponent', () => {
  let component: AuditTrailComponent;
  let fixture: ComponentFixture<AuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditTrailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.searchTerm).toBe('');
    expect(component.currentPage).toBe(1);
    expect(component.itemsPerPage).toBe(10);
    expect(component.auditLogs.length).toBeGreaterThan(0);
  });

  it('should filter logs based on search term', () => {
    const initialCount = component.filteredLogs.length;
    
    // Mock search event
    const mockEvent = {
      target: { value: 'Alex Turner' }
    } as any;
    
    component.onSearch(mockEvent);
    
    expect(component.searchTerm).toBe('Alex Turner');
    expect(component.filteredLogs.length).toBeLessThanOrEqual(initialCount);
  });

  it('should handle pagination correctly', () => {
    component.currentPage = 1;
    component.onNextPage();
    expect(component.currentPage).toBe(2);
    
    component.onPreviousPage();
    expect(component.currentPage).toBe(1);
  });

  it('should return correct action badge class', () => {
    expect(component.getActionBadgeClass('created')).toBe('action-created');
    expect(component.getActionBadgeClass('updated')).toBe('action-updated');
    expect(component.getActionBadgeClass('deleted')).toBe('action-deleted');
    expect(component.getActionBadgeClass('unknown')).toBe('action-default');
  });

  it('should track logs by id', () => {
    const log = component.auditLogs[0];
    expect(component.trackByLogId(0, log)).toBe(log.id);
  });

  it('should reset to first page when searching', () => {
    component.currentPage = 3;
    
    const mockEvent = {
      target: { value: 'test' }
    } as any;
    
    component.onSearch(mockEvent);
    expect(component.currentPage).toBe(1);
  });
}); 