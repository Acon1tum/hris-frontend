import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagementComponent } from './role-management.component';

describe('RoleManagementComponent', () => {
  let component: RoleManagementComponent;
  let fixture: ComponentFixture<RoleManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial roles data', () => {
    expect(component.roles.length).toBe(5);
  });

  it('should have correct role data structure', () => {
    const firstRole = component.roles[0];
    expect(firstRole.name).toBe('Administrator');
    expect(firstRole.permissions.length).toBeGreaterThan(0);
  });

  it('should track roles by id', () => {
    const role = component.roles[0];
    const trackResult = component.trackByRoleId(0, role);
    expect(trackResult).toBe(role.id);
  });

  it('should handle create new role click', () => {
    spyOn(console, 'log');
    component.onCreateNewRole();
    expect(console.log).toHaveBeenCalledWith('Create new role clicked');
  });

  it('should handle edit role click', () => {
    spyOn(console, 'log');
    const role = component.roles[0];
    component.onEditRole(role);
    expect(console.log).toHaveBeenCalledWith('Edit role:', role.name);
  });
}); 