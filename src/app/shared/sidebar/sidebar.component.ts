import { Component, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MenuItem } from '../../interfaces/auth.interface';
import { MENU_CONFIG } from '../../config/menu-config';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() isOpen = false;
  @Input() isCollapsed = false;
  @Input() isSidebarCollapsed = false;
  @Output() sidebarToggle = new EventEmitter<void>();
  @Output() sidebarCollapse = new EventEmitter<boolean>();
  @Output() stateChange = new EventEmitter<{isOpen: boolean; isCollapsed: boolean}>();

  menuItems: MenuItem[] = [];
  currentUser$ = this.authService.currentUser$;
  expandedItem: string | null = null;
  isMobile = window.innerWidth <= 768;

  // Add static app links for the APP section
  appLinks = [
    { name: 'Webflow', icon: 'apps' },
    { name: 'Framer', icon: 'dashboard_customize' },
    { name: 'Typeform', icon: 'description' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    const wasNotMobile = !this.isMobile;
    this.isMobile = window.innerWidth <= 768;
    
    if (wasNotMobile && this.isMobile) {
      this.isOpen = false;
      this.emitStateChange();
    } else if (!wasNotMobile && !this.isMobile) {
      this.isOpen = true;
      this.isCollapsed = false;
      this.emitStateChange();
    }
  }

  ngOnInit() {
    this.updateMenuItems();
    this.isOpen = !this.isMobile;
    this.isCollapsed = false;
    this.emitStateChange();

    // Update menu items when user changes
    this.currentUser$.subscribe(() => {
      this.updateMenuItems();
    });
  }

  private updateMenuItems() {
    // Use the imported menu configuration instead of defining items inline
    this.menuItems = this.filterMenuItemsByPermissions(MENU_CONFIG);
  }

  private filterMenuItemsByPermissions(items: MenuItem[]): MenuItem[] {
    return items.filter(item => {
      // Check if user has access to this menu item
      const hasAccess = this.authService.canAccessRoute(item.permissions);
      
      if (hasAccess && item.children) {
        // Filter children based on permissions
        item.children = this.filterMenuItemsByPermissions(item.children);
        // Only show parent if it has accessible children or direct access
        return item.children.length > 0 || item.permissions.length === 0;
      }
      
      return hasAccess;
    });
  }

  toggleSidebar() {
    if (this.isMobile) {
      this.isOpen = !this.isOpen;
      this.sidebarToggle.emit();
    } else {
      this.isCollapsed = !this.isCollapsed;
      this.sidebarCollapse.emit(this.isCollapsed);
    }
    this.emitStateChange();
  }

  private emitStateChange() {
    this.stateChange.emit({
      isOpen: this.isOpen,
      isCollapsed: this.isCollapsed
    });
  }

  toggleMenuItem(itemName: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    // If sidebar is collapsed and not mobile, expand it
    if (this.isCollapsed && !this.isMobile) {
      this.isCollapsed = false;
      this.isOpen = true;
      this.emitStateChange();
      setTimeout(() => {
        this.expandedItem = itemName;
      }, 200); // Adjust delay as needed for animation
      return;
    }

    if (this.expandedItem === itemName) {
      this.expandedItem = null;
    } else {
      this.expandedItem = itemName;
    }
  }

  isMenuItemExpanded(itemName: string): boolean {
    return this.expandedItem === itemName;
  }

  onMenuItemClick() {
    if (this.isMobile) {
      this.isOpen = false;
      this.sidebarToggle.emit();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 