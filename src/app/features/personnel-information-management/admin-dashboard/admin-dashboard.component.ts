import { Component, OnInit, HostListener, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

interface DepartmentStat {
  name: string;
  count: number;
  percentage: number;
}

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  hireDate: string;
  status: string;
  profileImage?: string;
}

interface StatCard {
  id: string;
  title: string;
  value: number;
  change: number;
  icon: string;
  description: string;
  isVisible: boolean;
  color: string;
  dataType: 'number' | 'percentage' | 'rating';
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CdkDrag,
    CdkDropList
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild(CdkDropList) dropList?: CdkDropList;
  
  title = 'Personnel Information Management';
  
  // Dashboard stats
  totalEmployees = 345;
  employeeChange = 5;
  pendingRequests = 12;
  requestChange = -2;
  recentMovements = 23;
  movementChange = 3;

  // Analytics metrics
  turnoverRate = 8.5;
  turnoverRateChange = 1.2;
  satisfactionLevel = 4.2;
  satisfactionChange = 0.3;
  performanceRating = 85;
  performanceChange = 2.5;

  departmentStats: DepartmentStat[] = [
    { name: 'IT', count: 45, percentage: 30 },
    { name: 'HR', count: 30, percentage: 20 },
    { name: 'Finance', count: 25, percentage: 17 },
    { name: 'Marketing', count: 20, percentage: 13 },
    { name: 'Operations', count: 30, percentage: 20 }
  ];

  recentEmployees: Employee[] = [
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.j@acme.com',
      department: 'Marketing',
      position: 'Marketing Manager',
      status: 'Active',
      hireDate: '15 Jan 2020',
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 2,
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.c@acme.com',
      department: 'Engineering',
      position: 'Senior Developer',
      status: 'Active',
      hireDate: '22 Mar 2019',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 3,
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.r@acme.com',
      department: 'Human Resources',
      position: 'HR Specialist',
      status: 'On Leave',
      hireDate: '05 Aug 2021',
      profileImage: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
      id: 4,
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.w@acme.com',
      department: 'Finance',
      position: 'Financial Analyst',
      status: 'Active',
      hireDate: '12 Nov 2022',
      profileImage: 'https://randomuser.me/api/portraits/men/75.jpg'
    },
    {
      id: 5,
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.c@acme.com',
      department: 'Engineering',
      position: 'Senior Developer',
      status: 'Active',
      hireDate: '22 Mar 2019',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 6,
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.r@acme.com',
      department: 'Human Resources',
      position: 'HR Specialist',
      status: 'On Leave',
      hireDate: '05 Aug 2021',
      profileImage: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
      id: 7,
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.w@acme.com',
      department: 'Finance',
      position: 'Financial Analyst',
      status: 'Active',
      hireDate: '12 Nov 2022',
      profileImage: 'https://randomuser.me/api/portraits/men/75.jpg'
    }
  ];

  // Pagination properties
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;
  searchTerm = '';
  paginatedEmployees: Employee[] = [];
  Math = Math; // Make Math available in template

  showEditModal = false;
  editEmployeeForm: FormGroup;
  selectedEmployee: Employee | null = null;

  isEditMode = false;
  selectedCard: StatCard | null = null;
  showCustomizeModal = false;
  customizeForm: FormGroup;
  availableColors = [
    { name: 'Blue', value: '#1993e5' },
    { name: 'Green', value: '#10b981' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Red', value: '#ef4444' }
  ];

  statCards: StatCard[] = [
    {
      id: 'totalEmployees',
      title: 'Total Employees',
      value: 0,
      change: 0,
      icon: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
      description: 'Current headcount',
      isVisible: true,
      color: '#1993e5',
      dataType: 'number'
    },
    {
      id: 'pendingRequests',
      title: 'Pending Requests',
      value: 0,
      change: 0,
      icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828843.png',
      description: 'Awaiting approval',
      isVisible: true,
      color: '#1993e5',
      dataType: 'number'
    },
    {
      id: 'recentMovements',
      title: 'Recent Movements',
      value: 0,
      change: 0,
      icon: 'https://cdn-icons-png.flaticon.com/512/747/747310.png',
      description: 'Last 30 days',
      isVisible: true,
      color: '#1993e5',
      dataType: 'number'
    },
    {
      id: 'turnoverRate',
      title: 'Employee Turnover Rate',
      value: 0,
      change: 0,
      icon: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png',
      description: 'Last 12 months',
      isVisible: true,
      color: '#1993e5',
      dataType: 'percentage'
    },
    {
      id: 'satisfactionLevel',
      title: 'Average Satisfaction Level',
      value: 0,
      change: 0,
      icon: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png',
      description: 'Employee survey',
      isVisible: true,
      color: '#1993e5',
      dataType: 'percentage'
    },
    {
      id: 'performanceRating',
      title: 'Performance Rating',
      value: 0,
      change: 0,
      icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828971.png',
      description: 'Average score',
      isVisible: true,
      color: '#1993e5',
      dataType: 'rating'
    }
  ];

  // New container template
  newCardTemplate: StatCard = {
    id: 'new',
    title: 'New Stat',
    value: 0,
    change: 0,
    icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828843.png',
    description: 'Add description',
    isVisible: true,
    color: '#1993e5',
    dataType: 'number'
  };

  pieColors = ['#1993e5', '#10b981', '#f97316', '#8b5cf6', '#ef4444', '#6366f1', '#f59e42', '#22d3ee'];

  chartTypes: Array<'pie' | 'bar' | 'line' | 'area'> = ['pie', 'bar', 'line', 'area'];
  currentChartTypeIndex = 0;
  chartType: 'pie' | 'bar' | 'line' | 'area' = 'pie';

  showChartTypeMenu = false;

  isChartEditMode = false;

  // Tooltip state for chart hover
  chartTooltip = {
    visible: false,
    x: 0,
    y: 0,
    label: '',
    value: 0
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private renderer: Renderer2
  ) {
    this.editEmployeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      position: ['', Validators.required],
      hireDate: ['', Validators.required],
      status: ['Active', Validators.required]
    });

    this.customizeForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      color: ['#1993e5'],
      dataType: ['number'],
      isVisible: [true]
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.checkScroll();
  }

  ngOnInit(): void {
    // Initialize component
    this.updatePagination();
    // Initial check for elements in view
    setTimeout(() => {
      this.checkScroll();
    }, 100);

    // Initialize stat cards with actual data
    this.statCards[0].value = this.totalEmployees;
    this.statCards[0].change = this.employeeChange;
    this.statCards[1].value = this.pendingRequests;
    this.statCards[1].change = this.requestChange;
    this.statCards[2].value = this.recentMovements;
    this.statCards[2].change = this.movementChange;
    this.statCards[3].value = this.turnoverRate;
    this.statCards[3].change = this.turnoverRateChange;
    this.statCards[4].value = this.satisfactionLevel;
    this.statCards[4].change = this.satisfactionChange;
    this.statCards[5].value = this.performanceRating;
    this.statCards[5].change = this.performanceChange;
  }

  // Pagination methods
  updatePagination() {
    // Filter employees based on search term
    let filteredEmployees = this.recentEmployees;
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filteredEmployees = this.recentEmployees.filter(emp => 
        emp.firstName.toLowerCase().includes(searchLower) ||
        emp.lastName.toLowerCase().includes(searchLower) ||
        emp.department.toLowerCase().includes(searchLower) ||
        emp.position.toLowerCase().includes(searchLower) ||
        emp.status.toLowerCase().includes(searchLower)
      );
    }

    this.totalItems = filteredEmployees.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);

    // Ensure current page is valid
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }

    // Get paginated data
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePagination();
    // Scroll to bottom of the page
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }, 100); // Small delay to ensure content is updated
  }

  onPageSizeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.pageSize = parseInt(select.value, 10);
    this.currentPage = 1; // Reset to first page when changing page size
    this.updatePagination();
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.currentPage = 1; // Reset to first page when searching
    this.updatePagination();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    if (this.totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of visible pages
      let start = Math.max(2, this.currentPage - 1);
      let end = Math.min(this.totalPages - 1, this.currentPage + 1);
      
      // Adjust if at the start
      if (this.currentPage <= 2) {
        end = 4;
      }
      // Adjust if at the end
      if (this.currentPage >= this.totalPages - 1) {
        start = this.totalPages - 3;
      }
      
      // Add ellipsis if needed
      if (start > 2) {
        pages.push(-1); // -1 represents ellipsis
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (end < this.totalPages - 1) {
        pages.push(-2); // -2 represents ellipsis
      }
      
      // Always show last page
      pages.push(this.totalPages);
    }
    
    return pages;
  }

  onAddEmployee(): void {
    this.router.navigate(['/personnel-information-management/add-employee']);
  }

  onEditEmployee(employee: Employee) {
    this.selectedEmployee = employee;
    this.editEmployeeForm.patchValue({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      department: employee.department,
      position: employee.position,
      hireDate: employee.hireDate,
      status: employee.status
    });
    this.showEditModal = true;
  }

  closeEditModal(event: Event) {
    event.preventDefault();
    this.showEditModal = false;
    this.selectedEmployee = null;
    this.editEmployeeForm.reset();
  }

  onSubmitEdit() {
    if (this.editEmployeeForm.valid && this.selectedEmployee) {
      // Here you would typically make an API call to update the employee
      const updatedEmployee = {
        ...this.selectedEmployee,
        ...this.editEmployeeForm.value
      };

      // Update the employee in the local array
      const index = this.recentEmployees.findIndex(emp => emp.id === this.selectedEmployee?.id);
      if (index !== -1) {
        this.recentEmployees[index] = updatedEmployee;
      }

      // Close the modal
      this.closeEditModal(new Event('click'));
    }
  }

  onDeleteEmployee(employee: Employee): void {
    if (confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
      // Call service to delete employee
      console.log('Deleting employee:', employee);
    }
  }

  onProcessRequests(): void {
    this.router.navigate(['/personnel-information-management/requests']);
  }

  getDepartmentIcon(department: string): string {
    const icons: { [key: string]: string } = {
      'IT': 'computer',
      'HR': 'group',
      'Finance': 'account_balance',
      'Marketing': 'campaign',
      'Operations': 'settings',
      'Engineering': 'engineering',
      'Sales': 'trending_up',
      'Customer Support': 'support_agent',
      'Research': 'science',
      'Legal': 'gavel',
      'Product': 'inventory_2',
      'Design': 'palette'
    };
    return icons[department] || 'business';
  }

  private checkScroll() {
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isVisible = (rect.top <= window.innerHeight * 0.95);
      
      if (isVisible) {
        element.classList.add('visible');
      }
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (this.dropList) {
      const dropListElement = this.dropList.element.nativeElement;
      if (this.isEditMode) {
        this.renderer.addClass(dropListElement, 'edit-mode');
      } else {
        this.renderer.removeClass(dropListElement, 'edit-mode');
        this.saveDashboardChanges();
      }
    }
  }

  saveDashboardChanges() {
    // Here you would typically make an API call to save the dashboard changes
    console.log('Saving dashboard changes...');
  }

  onCardClick(card: StatCard) {
    if (this.isEditMode) {
      this.selectedCard = card;
      this.customizeForm.patchValue({
        title: card.title,
        description: card.description,
        color: card.color,
        dataType: card.dataType,
        isVisible: card.isVisible
      });
      this.showCustomizeModal = true;
    }
  }

  saveCustomization() {
    if (this.selectedCard && this.customizeForm.valid) {
      const formValue = this.customizeForm.value;
      this.selectedCard.title = formValue.title;
      this.selectedCard.description = formValue.description;
      this.selectedCard.color = formValue.color;
      this.selectedCard.dataType = formValue.dataType;
      this.selectedCard.isVisible = formValue.isVisible;
      this.showCustomizeModal = false;
      this.selectedCard = null;
    }
  }

  closeCustomizeModal(event: Event) {
    event.preventDefault();
    this.showCustomizeModal = false;
    this.selectedCard = null;
  }

  getFormattedValue(card: StatCard): string {
    switch (card.dataType) {
      case 'percentage':
        return `${card.value}%`;
      case 'rating':
        return `${card.value}/5`;
      default:
        return card.value.toString();
    }
  }

  onDrop(event: CdkDragDrop<StatCard[]>) {
    if (this.isEditMode) {
      const draggedElement = event.item.element.nativeElement;
      const previousIndex = event.previousIndex;
      const cards = Array.from(this.dropList?.element.nativeElement.children || []);

      // Get pointer position (fallback to center of dragged element)
      let pointerX: number | null = null;
      let pointerY: number | null = null;
      if ((event as any).event && (event as any).event.clientX !== undefined) {
        pointerX = (event as any).event.clientX;
        pointerY = (event as any).event.clientY;
      }
      let dropCenter = { x: 0, y: 0 };
      if (pointerX !== null && pointerY !== null) {
        dropCenter = { x: pointerX, y: pointerY };
      } else {
        const draggedRect = draggedElement.getBoundingClientRect();
        dropCenter = {
          x: draggedRect.left + draggedRect.width / 2,
          y: draggedRect.top + draggedRect.height / 2
        };
      }

      // Find the nearest card
      let minDistance = Number.MAX_VALUE;
      let nearestIndex = previousIndex;
      cards.forEach((card: any, idx: number) => {
        if (idx === previousIndex) return;
        const rect = card.getBoundingClientRect();
        const center = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
        const distance = Math.sqrt(
          Math.pow(center.x - dropCenter.x, 2) +
          Math.pow(center.y - dropCenter.y, 2)
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearestIndex = idx;
        }
      });

      // Swap the two cards in the array
      if (previousIndex !== nearestIndex) {
        const temp = this.statCards[previousIndex];
        this.statCards[previousIndex] = this.statCards[nearestIndex];
        this.statCards[nearestIndex] = temp;
      }
    }
  }

  onDragStarted(event: any) {
    if (this.isEditMode) {
      document.body.classList.add('dragging');
      
      // Add a class to the dragged element
      const draggedElement = event.source.element.nativeElement;
      this.renderer.addClass(draggedElement, 'dragging');

      // Add a class to the drop list
      if (this.dropList) {
        const dropListElement = this.dropList.element.nativeElement;
        this.renderer.addClass(dropListElement, 'dragging-active');
        this.renderer.addClass(dropListElement, 'edit-mode');
      }
    }
  }

  onDragEnded(event: any) {
    document.body.classList.remove('dragging');
    
    // Remove classes from the dragged element
    const draggedElement = event.source.element.nativeElement;
    this.renderer.removeClass(draggedElement, 'dragging');
    this.renderer.removeClass(draggedElement, 'swapping');
    this.renderer.removeStyle(draggedElement, 'transform');

    // Remove class from the drop list
    if (this.dropList) {
      const dropListElement = this.dropList.element.nativeElement;
      this.renderer.removeClass(dropListElement, 'dragging-active');
    }
  }

  addNewCard() {
    if (this.isEditMode) {
      const newCard: StatCard = {
        ...this.newCardTemplate,
        id: `card-${Date.now()}` // Generate unique ID
      };
      this.statCards.push(newCard);
      // Open customization modal for the new card
      this.selectedCard = newCard;
      this.customizeForm.patchValue({
        title: newCard.title,
        description: newCard.description,
        color: newCard.color,
        dataType: newCard.dataType,
        isVisible: newCard.isVisible
      });
      this.showCustomizeModal = true;
    }
  }

  removeCard(card: StatCard) {
    if (this.isEditMode) {
      const index = this.statCards.findIndex(c => c.id === card.id);
      if (index !== -1) {
        this.statCards.splice(index, 1);
      }
    }
  }

  getPieColor(index: number): string {
    return this.pieColors[index % this.pieColors.length];
  }

  getPieDashArray(index: number): string {
    const total = this.departmentStats.reduce((sum, d) => sum + d.count, 0);
    const value = this.departmentStats[index].count;
    const circumference = 2 * Math.PI * 90;
    const dash = (value / total) * circumference;
    return `${dash} ${circumference - dash}`;
  }

  getPieDashOffset(index: number): string {
    const total = this.departmentStats.reduce((sum, d) => sum + d.count, 0);
    const circumference = 2 * Math.PI * 90;
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += (this.departmentStats[i].count / total) * circumference;
    }
    return `${-offset}`;
  }

  setChartType(type: 'pie' | 'bar' | 'line' | 'area') {
    this.chartType = type;
    this.currentChartTypeIndex = this.chartTypes.indexOf(type);
  }

  prevChartType() {
    this.currentChartTypeIndex = (this.currentChartTypeIndex - 1 + this.chartTypes.length) % this.chartTypes.length;
    this.chartType = this.chartTypes[this.currentChartTypeIndex];
  }

  nextChartType() {
    this.currentChartTypeIndex = (this.currentChartTypeIndex + 1) % this.chartTypes.length;
    this.chartType = this.chartTypes[this.currentChartTypeIndex];
  }

  getChartTypeLabel(): string {
    switch (this.chartType) {
      case 'pie': return 'Pie';
      case 'bar': return 'Bar';
      case 'line': return 'Line';
      case 'area': return 'Area';
      default: return '';
    }
  }

  toggleChartTypeMenu() {
    this.showChartTypeMenu = !this.showChartTypeMenu;
  }

  getMaxDeptCount(): number {
    return this.departmentStats.reduce((max, d) => Math.max(max, d.count), 0) || 1;
  }

  getLineChartPoints(xOffset = 0, yOffset = 0): string {
    if (!this.departmentStats || !this.departmentStats.length) return '';
    return this.departmentStats.map((dept, i) => {
      const x = 54 + i * 40 + xOffset;
      const y = 200 - (dept.count / this.getMaxDeptCount()) * 160 + yOffset;
      return `${x},${y}`;
    }).join(' ');
  }

  getAreaChartPoints(xOffset = 0, yOffset = 0): string {
    if (!this.departmentStats || !this.departmentStats.length) return '';
    let points = this.departmentStats.map((dept, i) => {
      const x = 54 + i * 40 + xOffset;
      const y = 200 - (dept.count / this.getMaxDeptCount()) * 160 + yOffset;
      return `${x},${y}`;
    });
    // Close the area shape to the bottom
    points.push(`${54 + (this.departmentStats.length - 1) * 40 + xOffset},200`);
    points.push(`54,200`);
    return points.join(' ');
  }

  getDepartmentTotal(): number {
    return this.departmentStats.reduce((acc, d) => acc + d.count, 0);
  }

  getDepartmentPercentage(dept: DepartmentStat): number {
    const total = this.getDepartmentTotal();
    return total ? (dept.count / total) * 100 : 0;
  }

  // Helper for column chart (optional, but for demo, columns are like bars with spacing)
  getColumnChartX(i: number): number {
    return 20 + i * 35;
  }

  getColumnChartHeight(dept: DepartmentStat): number {
    return (dept.count / this.getMaxDeptCount()) * 180;
  }

  getColumnChartY(dept: DepartmentStat): number {
    return 220 - this.getColumnChartHeight(dept) - 20;
  }

  enterChartEditMode() {
    this.isChartEditMode = true;
  }

  exitChartEditMode() {
    this.isChartEditMode = false;
  }

  showChartTooltip(event: MouseEvent, label: string, value: number) {
    this.chartTooltip.visible = true;
    this.chartTooltip.x = event.clientX;
    this.chartTooltip.y = event.clientY;
    this.chartTooltip.label = label;
    this.chartTooltip.value = value;
  }

  moveChartTooltip(event: MouseEvent) {
    if (this.chartTooltip.visible) {
      this.chartTooltip.x = event.clientX;
      this.chartTooltip.y = event.clientY;
    }
  }

  hideChartTooltip() {
    this.chartTooltip.visible = false;
  }

  ngAfterViewInit() {
    const elements = document.querySelectorAll('.scroll-animate');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    elements.forEach(el => observer.observe(el));
  }
} 