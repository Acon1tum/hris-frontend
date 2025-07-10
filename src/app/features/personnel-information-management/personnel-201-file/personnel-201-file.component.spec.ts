// Fade-in animation for main container and table rows is handled via CSS (.fade-in-smooth) and template class bindings.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Personnel201FileComponent } from './personnel-201-file.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('Personnel201FileComponent', () => {
  let component: Personnel201FileComponent;
  let fixture: ComponentFixture<Personnel201FileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Personnel201FileComponent, FormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(Personnel201FileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the personnel files table', () => {
    const rows = fixture.debugElement.queryAll(By.css('.personnel-table tbody tr'));
    expect(rows.length).toBeGreaterThan(0);
    const firstRow = rows[0].nativeElement;
    expect(firstRow.textContent).toContain('Juan Dela Cruz');
  });

  it('should filter by department', () => {
    component.personnelFiles = [
      { employeeName: 'Alice', department: 'HR', position: 'Manager', dateCreated: '2024-06-01', lastModified: '2024-06-02' } as any,
      { employeeName: 'Bob', department: 'IT', position: 'Developer', dateCreated: '2024-06-01', lastModified: '2024-06-02' } as any
    ];
    component.filter.department = 'HR';
    expect(component.filteredPersonnelFiles.length).toBe(1);
    expect(component.filteredPersonnelFiles[0].employeeName).toBe('Alice');
  });

  it('should filter by position', () => {
    component.personnelFiles = [
      { employeeName: 'Alice', department: 'HR', position: 'Manager', dateCreated: '2024-06-01', lastModified: '2024-06-02' } as any,
      { employeeName: 'Bob', department: 'IT', position: 'Developer', dateCreated: '2024-06-01', lastModified: '2024-06-02' } as any
    ];
    component.filter.position = 'Developer';
    expect(component.filteredPersonnelFiles.length).toBe(1);
    expect(component.filteredPersonnelFiles[0].employeeName).toBe('Bob');
  });

  it('should sort by employee name A-Z', () => {
    component.personnelFiles = [
      { employeeName: 'Bob', department: 'IT', position: 'Developer', dateCreated: '2024-06-01', lastModified: '2024-06-02' } as any,
      { employeeName: 'Alice', department: 'HR', position: 'Manager', dateCreated: '2024-06-01', lastModified: '2024-06-02' } as any
    ];
    component.filter.nameSort = 'az';
    expect(component.filteredPersonnelFiles[0].employeeName).toBe('Alice');
  });

  it('should clear all filters', () => {
    component.filter.department = 'HR';
    component.filter.position = 'Manager';
    component.filter.nameSort = 'az';
    component.clearFilters();
    expect(component.filter.department).toBe('');
    expect(component.filter.position).toBe('');
    expect(component.filter.nameSort).toBe('');
  });

  it('should update currentPage and call loadPersonnelFiles on page change', () => {
    spyOn(component, 'loadPersonnelFiles');
    component.totalPages = 3;
    component.currentPage = 1;
    component.onPageChange(2);
    expect(component.currentPage).toBe(2);
    expect(component.loadPersonnelFiles).toHaveBeenCalled();
  });

  it('should not change page if page is out of bounds', () => {
    spyOn(component, 'loadPersonnelFiles');
    component.totalPages = 3;
    component.currentPage = 2;
    component.onPageChange(0);
    expect(component.currentPage).toBe(2);
    expect(component.loadPersonnelFiles).not.toHaveBeenCalled();
    component.onPageChange(4);
    expect(component.currentPage).toBe(2);
    expect(component.loadPersonnelFiles).not.toHaveBeenCalled();
  });

  it('should update pageSize and reset to page 1 on page size change', () => {
    spyOn(component, 'loadPersonnelFiles');
    const event = { target: { value: '20' } } as any;
    component.currentPage = 3;
    component.onPageSizeChange(event);
    expect(component.pageSize).toBe(20);
    expect(component.currentPage).toBe(1);
    expect(component.loadPersonnelFiles).toHaveBeenCalled();
  });

  it('should return correct page numbers for pagination', () => {
    component.totalPages = 7;
    component.currentPage = 4;
    const pages = component.getPageNumbers();
    expect(pages).toEqual([2,3,4,5,6]);
    component.currentPage = 1;
    expect(component.getPageNumbers()).toEqual([1,2,3,4,5]);
    component.currentPage = 7;
    expect(component.getPageNumbers()).toEqual([3,4,5,6,7]);
  });
}); 