import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsAuditTrailModalComponent } from './details-audit-trail-modal.component';

describe('DetailsAuditTrailModalComponent', () => {
  let component: DetailsAuditTrailModalComponent;
  let fixture: ComponentFixture<DetailsAuditTrailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsAuditTrailModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsAuditTrailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 