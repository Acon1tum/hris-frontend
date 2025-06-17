import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardComponent } from './admin-dashboard.component';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct title', () => {
    expect(component.title).toBe('Personnel Management Dashboard');
  });

  it('should have dashboard stats', () => {
    expect(component.dashboardStats).toBeDefined();
    expect(component.dashboardStats.length).toBe(3);
  });

  it('should have recent employees', () => {
    expect(component.recentEmployees).toBeDefined();
    expect(component.recentEmployees.length).toBe(4);
  });

  it('should have quick actions', () => {
    expect(component.quickActions).toBeDefined();
    expect(component.quickActions.length).toBe(3);
  });

  it('should call onQuickAction when action is triggered', () => {
    spyOn(console, 'log');
    component.onQuickAction('addEmployee');
    expect(console.log).toHaveBeenCalledWith('Quick action:', 'addEmployee');
  });

  it('should call onEditEmployee when edit is triggered', () => {
    spyOn(console, 'log');
    component.onEditEmployee(1);
    expect(console.log).toHaveBeenCalledWith('Edit employee:', 1);
  });

  it('should call onDeleteEmployee when delete is triggered', () => {
    spyOn(console, 'log');
    component.onDeleteEmployee(1);
    expect(console.log).toHaveBeenCalledWith('Delete employee:', 1);
  });
}); 