import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEditModalComponent, Personnel201ModalData } from './create-edit-modal.component';
import { By } from '@angular/platform-browser';

describe('CreateEditModalComponent', () => {
  let component: CreateEditModalComponent;
  let fixture: ComponentFixture<CreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditModalComponent);
    component = fixture.componentInstance;
    component.data = {
      firstName: '',
      middleName: '',
      lastName: '',
      suffix: '',
      email: '',
      number: '',
      address: '',
      department: '',
      position: '',
      file: null
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all form fields', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input[name="firstName"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="middleName"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="lastName"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="suffix"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="department"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="position"]')).toBeTruthy();
    expect(compiled.querySelector('input[type="file"]')).toBeTruthy();
  });
}); 