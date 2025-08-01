import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowsComponent } from './workflows.component';

describe('WorkflowsComponent', () => {
  let component: WorkflowsComponent;
  let fixture: ComponentFixture<WorkflowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WorkflowsComponent]
    });
    fixture = TestBed.createComponent(WorkflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
