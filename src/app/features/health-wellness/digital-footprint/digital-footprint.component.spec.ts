import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DigitalFootprintComponent } from './digital-footprint.component';

describe('DigitalFootprintComponent', () => {
  let component: DigitalFootprintComponent;
  let fixture: ComponentFixture<DigitalFootprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitalFootprintComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalFootprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 