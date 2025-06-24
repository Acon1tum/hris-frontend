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
}); 