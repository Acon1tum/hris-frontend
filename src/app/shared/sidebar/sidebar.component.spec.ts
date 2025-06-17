import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have menu items', () => {
    expect(component.menuItems.length).toBeGreaterThan(0);
  });

  it('should emit sidebarToggle when toggleSidebar is called', () => {
    spyOn(component.sidebarToggle, 'emit');
    component.toggleSidebar();
    expect(component.sidebarToggle.emit).toHaveBeenCalled();
  });

  it('should emit sidebarToggle when onMenuItemClick is called on mobile', () => {
    spyOn(component.sidebarToggle, 'emit');
    // Mock window.innerWidth for mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });
    component.onMenuItemClick();
    expect(component.sidebarToggle.emit).toHaveBeenCalled();
  });

  it('should not emit sidebarToggle when onMenuItemClick is called on desktop', () => {
    spyOn(component.sidebarToggle, 'emit');
    // Mock window.innerWidth for desktop
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    component.onMenuItemClick();
    expect(component.sidebarToggle.emit).not.toHaveBeenCalled();
  });
}); 