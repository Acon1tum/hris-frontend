import { Component, EventEmitter, Input, Output, HostListener, AfterViewInit, ElementRef, Renderer2, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Personnel201ModalData {
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  email: string;
  number: string;
  address: string;
  department: string;
  position: string;
  file?: File | null;
  birthdate?: string;
  gender?: string;
  civilStatus?: string;
  citizenship?: string;
  employmentType?: string;
  designation?: string;
  appointmentDate?: string;
  startDate?: string;
  employmentStatus?: string;
  jobLevel?: string;
  jobGrade?: string;
  gsis?: string;
  pagibig?: string;
  philhealth?: string;
  sss?: string;
  dependents?: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
  emergencyContactRelationship?: string;
  fileName?: string;
  profilePictureUrl?: string;
  profilePictureFile?: File | null;
}

@Component({
  selector: 'app-create-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-edit-modal.component.html',
  styleUrls: ['./create-edit-modal.component.scss']
})
export class CreateEditModalComponent implements AfterViewInit {
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() data: Personnel201ModalData = {
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    email: '',
    number: '',
    address: '',
    department: '',
    position: '',
    file: null,
    birthdate: '',
    gender: '',
    civilStatus: '',
    citizenship: '',
    employmentType: '',
    designation: '',
    appointmentDate: '',
    startDate: '',
    employmentStatus: '',
    jobLevel: '',
    jobGrade: '',
    gsis: '',
    pagibig: '',
    philhealth: '',
    sss: '',
    dependents: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    emergencyContactRelationship: '',
    fileName: '',
    profilePictureUrl: '',
    profilePictureFile: null
  };
  @Output() save = new EventEmitter<Personnel201ModalData>();
  @Output() cancel = new EventEmitter<void>();

  @ViewChildren('fadeSection', { read: ElementRef }) fadeSections!: QueryList<ElementRef>;
  @ViewChild('modalForm') modalForm: any;
  private lastScrollTop = 0;

  constructor(private renderer: Renderer2) {}

  departmentPositionMap: { [key: string]: string } = {
    'IT': 'IT Support Specialist',
    'Human Resources': 'HR Specialist',
    'Finance': 'Financial Analyst',
    'Marketing': 'Marketing Manager',
    'Operations': 'Operations Coordinator',
    'Graphics': 'Graphic Designer'
  };

  isDragOver = false;
  showFloatingProfile = false;
  closing = false;

  public formSubmitted: boolean = false;
  public showValidationMessage: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollThreshold = 150;
    this.showFloatingProfile = window.scrollY > scrollThreshold;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;

    const file = event.dataTransfer?.files[0];
    if (file) {
      this.data.file = file;
      this.data.fileName = file.name;
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files && event.target.files[0];
    if (file) {
      this.data.file = file;
      this.data.fileName = file.name;
    }
    // Do nothing if no file is selected (cancelled)
  }

  removeFile(): void {
    this.data.file = null;
    this.data.fileName = '';
  }

  onProfilePictureChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.data.profilePictureFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.data.profilePictureUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeProfilePicture(): void {
    this.data.profilePictureFile = null;
    this.data.profilePictureUrl = '';
  }

  onSave() {
    this.formSubmitted = true;
    // Check for required file and form validity
    const isFileValid = !!this.data.fileName;
    if (this.modalForm && (!this.modalForm.form.valid || !isFileValid)) {
      this.showValidationMessage = true;
      setTimeout(() => {
        this.showValidationMessage = false;
      }, 1000);
      return;
    }
    this.save.emit(this.data);
  }

  onCancel() {
    this.closing = true;
    setTimeout(() => {
      this.cancel.emit();
      this.closing = false;
    }, 400); // match animation duration
  }

  onDepartmentChange() {
    this.data.position = this.departmentPositionMap[this.data.department] || '';
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const scrollingUp = scrollTop < this.lastScrollTop;
          this.lastScrollTop = scrollTop;

          if (entry.isIntersecting && scrollingUp) {
            this.renderer.addClass(entry.target, 'in-view');
          } else if (!entry.isIntersecting) {
            this.renderer.removeClass(entry.target, 'in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    this.fadeSections.forEach(section => {
      observer.observe(section.nativeElement);
    });
  }
} 