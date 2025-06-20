import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTypeManagementComponent } from './leave-type-management.component';

describe('LeaveTypeManagementComponent', () => {
  let component: LeaveTypeManagementComponent;
  let fixture: ComponentFixture<LeaveTypeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveTypeManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveTypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    expect(component.title).toBe('Leave Types Management');
  });

  it('should have leave types data', () => {
    expect(component.leaveTypes).toBeDefined();
    expect(component.leaveTypes.length).toBeGreaterThan(0);
  });

  it('should handle add new leave type', () => {
    spyOn(console, 'log');
    component.onAddNewLeaveType();
    expect(console.log).toHaveBeenCalledWith('Add new leave type');
  });

  it('should handle edit leave type', () => {
    spyOn(console, 'log');
    const leaveType = component.leaveTypes[0];
    component.onEditLeaveType(leaveType);
    expect(console.log).toHaveBeenCalledWith('Edit leave type:', leaveType);
  });

  it('should handle delete leave type', () => {
    spyOn(console, 'log');
    const leaveType = component.leaveTypes[0];
    component.onDeleteLeaveType(leaveType);
    expect(console.log).toHaveBeenCalledWith('Delete leave type:', leaveType);
  });
}); 