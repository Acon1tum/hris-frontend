import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemParametersComponent } from './system-parameters.component';

describe('SystemParametersComponent', () => {
  let component: SystemParametersComponent;
  let fixture: ComponentFixture<SystemParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemParametersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 