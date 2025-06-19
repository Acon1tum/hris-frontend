import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileComponent } from './my-profile.component';

describe('MyProfileComponent', () => {
  let component: MyProfileComponent;
  let fixture: ComponentFixture<MyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default user profile data', () => {
    expect(component.userProfile).toBeDefined();
    expect(component.userProfile.general.fullName).toBe('Sophia Rodriguez');
    expect(component.userProfile.employment.designation).toBe('Senior Software Engineer');
    expect(component.userProfile.membership.gsis).toBe('123-456-7890');
    expect(component.userProfile.other.emergencyContactName).toBe('Ethan Carter');
  });

  it('should return correct general information fields', () => {
    const fields = component.generalInformationFields;
    expect(fields.length).toBe(8);
    expect(fields[0]).toEqual({ label: 'Full Name', value: 'Sophia Rodriguez' });
    expect(fields[1]).toEqual({ label: 'Birthdate', value: 'July 15, 1993' });
    expect(fields[2]).toEqual({ label: 'Contact Number', value: '+1-555-123-4567' });
  });

  it('should return correct employment details fields', () => {
    const fields = component.employmentDetailsFields;
    expect(fields.length).toBe(8);
    expect(fields[0]).toEqual({ label: 'Employment Type', value: 'Regular' });
    expect(fields[1]).toEqual({ label: 'Designation', value: 'Senior Software Engineer' });
    expect(fields[2]).toEqual({ label: 'Department', value: 'Technology' });
  });

  it('should return correct membership information fields', () => {
    const fields = component.membershipInformationFields;
    expect(fields.length).toBe(4);
    expect(fields[0]).toEqual({ label: 'GSIS', value: '123-456-7890' });
    expect(fields[1]).toEqual({ label: 'Pag-IBIG', value: '987-654-3210' });
    expect(fields[2]).toEqual({ label: 'PhilHealth', value: '11-222222222-3' });
    expect(fields[3]).toEqual({ label: 'SSS', value: '33-444444444-5' });
  });

  it('should return correct other information fields', () => {
    const fields = component.otherInformationFields;
    expect(fields.length).toBe(4);
    expect(fields[0]).toEqual({ label: 'Dependents', value: 'None' });
    expect(fields[1]).toEqual({ label: 'Emergency Contact Name', value: 'Ethan Carter' });
    expect(fields[2]).toEqual({ label: 'Emergency Contact Number', value: '+1-555-987-6543' });
    expect(fields[3]).toEqual({ label: 'Emergency Contact Relationship', value: 'Father' });
  });

  it('should handle edit profile click', () => {
    spyOn(console, 'log');
    
    component.onEditProfile();
    expect(console.log).toHaveBeenCalledWith('Edit profile clicked');
  });

  it('should have all required profile sections', () => {
    expect(component.userProfile.general).toBeDefined();
    expect(component.userProfile.employment).toBeDefined();
    expect(component.userProfile.membership).toBeDefined();
    expect(component.userProfile.other).toBeDefined();
  });

  it('should have valid contact information', () => {
    const general = component.userProfile.general;
    expect(general.email).toContain('@');
    expect(general.contactNumber).toContain('+');
    expect(general.address).toBeTruthy();
  });

  it('should have valid employment status', () => {
    const employment = component.userProfile.employment;
    expect(employment.employmentStatus).toBe('Active');
    expect(employment.employmentType).toBe('Regular');
    expect(employment.department).toBeTruthy();
  });

  it('should have valid membership numbers', () => {
    const membership = component.userProfile.membership;
    expect(membership.gsis).toMatch(/^\d{3}-\d{3}-\d{4}$/);
    expect(membership.pagibig).toMatch(/^\d{3}-\d{3}-\d{4}$/);
    expect(membership.philhealth).toMatch(/^\d{2}-\d{9}-\d{1}$/);
    expect(membership.sss).toMatch(/^\d{2}-\d{9}-\d{1}$/);
  });

  it('should have emergency contact information', () => {
    const other = component.userProfile.other;
    expect(other.emergencyContactName).toBeTruthy();
    expect(other.emergencyContactNumber).toContain('+');
    expect(other.emergencyContactRelationship).toBeTruthy();
  });

  it('should organize profile data into field arrays', () => {
    expect(component.generalInformationFields).toBeInstanceOf(Array);
    expect(component.employmentDetailsFields).toBeInstanceOf(Array);
    expect(component.membershipInformationFields).toBeInstanceOf(Array);
    expect(component.otherInformationFields).toBeInstanceOf(Array);
  });

  it('should have consistent field structure', () => {
    const allFields = [
      ...component.generalInformationFields,
      ...component.employmentDetailsFields,
      ...component.membershipInformationFields,
      ...component.otherInformationFields
    ];

    allFields.forEach(field => {
      expect(field).toHaveProperty('label');
      expect(field).toHaveProperty('value');
      expect(typeof field.label).toBe('string');
      expect(typeof field.value).toBe('string');
    });
  });
}); 