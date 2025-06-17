import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerformanceManagementComponent } from './index.component';

describe('PerformanceManagementComponent', () => {
  let component: PerformanceManagementComponent;
  let fixture: ComponentFixture<PerformanceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceManagementComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Performance Management');
  });

  it('should have performance features', () => {
    expect(component.performanceFeatures.length).toBeGreaterThan(0);
  });
}); 