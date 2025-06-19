import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementComponent } from './user-management.component';

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial users data', () => {
    expect(component.users.length).toBe(5);
  });

  it('should filter users correctly', () => {
    component.searchTerm = 'ethan';
    const filtered = component.filteredUsers;
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Ethan Carter');
  });

  it('should track users by id', () => {
    const user = component.users[0];
    const trackResult = component.trackByUserId(0, user);
    expect(trackResult).toBe(user.id);
  });
}); 