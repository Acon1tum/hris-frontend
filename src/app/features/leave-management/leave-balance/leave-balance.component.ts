import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Employee {
  id: string;
  name: string;
  department: string;
  type: string;
  avatar: string;
  accrued: number;
  used: number;
  remaining: number;
  expiring: number;
}

interface EmployeeType {
  id: string;
  name: string;
  department: string;
  avatar: string;
  accrued: number;
  used: number;
  remaining: number;
  expiring: number;
}

@Component({
  selector: 'app-leave-balance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leave-balance.component.html',
  styleUrls: ['./leave-balance.component.scss']
})
export class LeaveBalanceComponent {
  title = 'Leave Balances';
  subtitle = 'Manage and view leave balances for all employees.';
  searchTerm = '';

  employees: Employee[] = [
    {
      id: 'EC1001',
      name: 'Ethan Carter',
      department: 'Marketing',
      type: 'Regular',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLakjcv3GTevMA4RWIJGxC8TXAcsihS02nkLM6AUMQ0tfRpxUZNcF59cgev20q6-wU6hbA8GYpJamRqRAeUpBzw4HKajtqKB-Zit8oqqXLrtpJOWlG-d0xrWyZ43tqgjR2b9PkffshikRechuPY8e-Q_W5B3lsPafTGOkyS1ku_raUytqoG2VMm6DWPeGAg79GST8G5CY53H7fgwfIn5XoTVhpxtve-ciCEqRs2gg12WFe0D4CI4la6IUUT3oFzRWtnKAJkwry2pgb',
      accrued: 120,
      used: 80,
      remaining: 40,
      expiring: 6
    },
    {
      id: 'OB1002',
      name: 'Olivia Bennett',
      department: 'Sales',
      type: 'Contractual',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4ZhVbGKrvnJ-hHIbZNkviJAdAdryAWGmkx51mS-MQwVu9zJXdSiI-3fjR3gd296fD09cVpHcSgVBGbUGDMnHrULMToSZPgBxAU1CqvN2kxbXgTcBCSriFvsiwXQJtwiab2ZGKlUbyZblkZdxbACPGz6Eo4f47ztC5gTeiQ5DC9ou3GNAiBu-F9Kng8eJ6XeLnz6QTSk3R9Ac8yb522KHQ0yu4xNuNQ59YsameMGBZzRu5yAQtKpi4tr567nAw61PpcLnaYD2vyjFg',
      accrued: 60,
      used: 30,
      remaining: 30,
      expiring: 2
    },
    {
      id: 'NT1003',
      name: 'Noah Thompson',
      department: 'Engineering',
      type: 'Part_time',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNFV9TfaYpn9M8_I0v-n9qWyRQ8to2YJ3CDs5gKFtZx312cYBMUBjK1sGbLvn8OoqUpSjgZvtNFpzVqSKlMd7c0S6cp032_xFsoRRg6nd5-ak4Jy-zu1oxMbpieiFrnyWna6mNYhqY5IUfWOEeRkvq484x1lGie8sbPiF8ip-xrNHRm5U2mi8x9oVvt6cVOJne7kyqJNtHG5OI3UnqY_GIW-djzUjdAiQNzV8PCV4hDjuTmw4qgtjnAcZqAagfQjleXxZ8ik6YNrtD',
      accrued: 40,
      used: 15,
      remaining: 25,
      expiring: 1
    },
    {
      id: 'AM1004',
      name: 'Ava Martinez',
      department: 'Product',
      type: 'Temporary',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc1Ei-2QhtIR4Vs1IgF0Bb8RCpEEVRsIlZhJ0f8BzkW7GdvVor0ZbPBDkRphGJYH_TFPCLdGeLUGdnpzgZVJ8AMFmTVm9mKwCaof9piT_rWqpwVQ5KpugUAJSzUJE_r69Qk3efJSzFEXysZq3oKTOAw5vGQQly7hxPOJ65UkMBHERSt9toRaBACSHe5ykJ18TdU13STHa2tO4t20v9h6jXl0LRiA6OVSDz69D4V1yrtD6s6F8f7epgBMHswOgHZyPMC_jW-T-Zf1xl',
      accrued: 20,
      used: 5,
      remaining: 15,
      expiring: 0
    },
    {
      id: 'LH1005',
      name: 'Liam Harris',
      department: 'Customer Support',
      type: 'Consultant',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK8N4fY8JMJpdAe34vAySLz5D7RgB2dX-hTYiXRLrOLzAEQTtt2Bt5N7cS2eh5E9oqTL_MP6rO_xP6kSm77wWoAiaoepIpeiLFF53TzwH-dYsihvlX-l9axQSJp25LVHxZi2hsU4NYFUFxOEIfGYmYrTX6hoXry1HI_9jMbskw1gVTxdnYI5Z42PEEanu7mHH1WvM-d-McuVQ5v23c3fuIuJQfQb_B2gHlg44Ro3Wd3F8KgYabzr69gVJGkUi7LfFVAzsprz_pC99O',
      accrued: 10,
      used: 2,
      remaining: 8,
      expiring: 0
    }
  ];

  employeeTypes: EmployeeType[] = [
    {
      id: 'REG',
      name: 'Regular',
      department: 'All',
      avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      accrued: 120,
      used: 80,
      remaining: 40,
      expiring: 6
    },
    {
      id: 'CON',
      name: 'Contractual',
      department: 'All',
      avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
      accrued: 60,
      used: 30,
      remaining: 30,
      expiring: 2
    },
    {
      id: 'PT',
      name: 'Part_time',
      department: 'All',
      avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135789.png',
      accrued: 40,
      used: 15,
      remaining: 25,
      expiring: 1
    },
    {
      id: 'TMP',
      name: 'Temporary',
      department: 'All',
      avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135792.png',
      accrued: 20,
      used: 5,
      remaining: 15,
      expiring: 0
    },
    {
      id: 'CNS',
      name: 'Consultant',
      department: 'All',
      avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135773.png',
      accrued: 10,
      used: 2,
      remaining: 8,
      expiring: 0
    }
  ];

  filteredEmployees = [...this.employees];
  currentPage = 1;
  itemsPerPage = 5;
  totalResults = this.employees.length;

  // Tab state
  activeTab: 'employee' | 'employeeType' = 'employee';

  // Modal state for Employee
  showEmployeeModal = false;
  selectedEmployee: Employee | null = null;

  // Modal state for Employee Type
  showEmployeeTypeModal = false;
  selectedEmployeeType: EmployeeType | null = null;

  // Adjust Credits modal state for Employee
  showEmployeeAdjustModal = false;
  selectedEmployeeForAdjust: Employee | null = null;

  // Adjust Credits modal state for Employee Type
  showEmployeeTypeAdjustModal = false;
  selectedEmployeeTypeForAdjust: EmployeeType | null = null;

  // Mock data for departments and employee types
  departments: string[] = ['All', 'Marketing', 'Sales', 'Engineering', 'Product', 'Customer Support'];
  employeeTypeList: string[] = ['All', 'Regular', 'Contractual', 'Part_time', 'Temporary', 'Consultant'];

  // State for filters and selection in Adjust Credits modal
  selectedDepartment: string = 'All';
  selectedEmployeeTypeFilter: string = 'All';
  filteredEmployeeList: Employee[] = [];
  selectedEmployeeForDropdown: Employee | null = null;

  // State for adjustment credit
  adjustmentCredit: number = 0;

  // State for Adjust Credits modal for Employee Type
  selectedEmployeeTypeForDropdown: EmployeeType | null = null;
  adjustmentCreditType: number = 0;

  constructor() {
    this.updateFilteredEmployees();
  }

  onSearchChange(): void {
    this.updateFilteredEmployees();
  }

  updateFilteredEmployees(): void {
    if (!this.searchTerm.trim()) {
      this.filteredEmployees = [...this.employees];
    } else {
      const searchLower = this.searchTerm.toLowerCase();
      this.filteredEmployees = this.employees.filter(employee =>
        employee.name.toLowerCase().includes(searchLower) ||
        employee.id.toLowerCase().includes(searchLower) ||
        employee.department.toLowerCase().includes(searchLower)
      );
    }
    this.totalResults = this.filteredEmployees.length;
  }

  adjustCredits(item?: Employee | EmployeeType): void {
    if (this.activeTab === 'employee') {
      // If called from button, no item, just open generic modal
      if (!item) {
        this.selectedEmployeeForAdjust = null;
      } else {
        this.selectedEmployeeForAdjust = item as Employee;
      }
      this.showEmployeeAdjustModal = true;
    } else {
      if (!item) {
        this.selectedEmployeeTypeForAdjust = null;
      } else {
        this.selectedEmployeeTypeForAdjust = item as EmployeeType;
      }
      this.showEmployeeTypeAdjustModal = true;
    }
  }

  closeEmployeeAdjustModal(): void {
    this.showEmployeeAdjustModal = false;
    this.selectedEmployeeForAdjust = null;
  }

  closeEmployeeTypeAdjustModal(): void {
    this.showEmployeeTypeAdjustModal = false;
    this.selectedEmployeeTypeForAdjust = null;
  }

  viewDetails(item: Employee | EmployeeType): void {
    if (this.activeTab === 'employee') {
      this.selectedEmployee = item as Employee;
      this.showEmployeeModal = true;
    } else {
      this.selectedEmployeeType = item as EmployeeType;
      this.showEmployeeTypeModal = true;
    }
  }

  closeEmployeeModal(): void {
    this.showEmployeeModal = false;
    this.selectedEmployee = null;
  }

  closeEmployeeTypeModal(): void {
    this.showEmployeeTypeModal = false;
    this.selectedEmployeeType = null;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.totalResults / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  get isPreviousDisabled(): boolean {
    return this.currentPage === 1;
  }

  get isNextDisabled(): boolean {
    const totalPages = Math.ceil(this.totalResults / this.itemsPerPage);
    return this.currentPage >= totalPages;
  }

  get currentResults(): string {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.totalResults);
    return `Showing ${start} to ${end} of ${this.totalResults} results`;
  }

  setTab(tab: 'employee' | 'employeeType') {
    this.activeTab = tab;
  }

  // Update filtered employee list based on filters
  updateFilteredEmployeeList(): void {
    this.filteredEmployeeList = this.employees.filter(emp => {
      const matchesDept = this.selectedDepartment === 'All' || emp.department === this.selectedDepartment;
      // For demo, assume all employees are of all types
      return matchesDept;
    });
    if (!this.filteredEmployeeList.includes(this.selectedEmployeeForDropdown!)) {
      this.selectedEmployeeForDropdown = null;
    }
  }

  // Methods for adjustment credit
  incrementAdjustmentCredit(): void {
    this.adjustmentCredit++;
  }
  decrementAdjustmentCredit(): void {
    if (this.adjustmentCredit > 0) this.adjustmentCredit--;
  }
  setAdjustmentCredit(value: number): void {
    this.adjustmentCredit = value;
  }

  // Save Adjust Credits for Employee
  saveEmployeeAdjustCredits(): void {
    if (this.selectedEmployeeForDropdown) {
      // Find the employee in the main array and update accrued
      const idx = this.employees.findIndex(e => e.id === this.selectedEmployeeForDropdown!.id);
      if (idx !== -1) {
        this.employees[idx].accrued = this.adjustmentCredit;
        // Auto-calculate remaining as accrued - used
        this.employees[idx].remaining = this.adjustmentCredit - this.employees[idx].used;
      }
      this.updateFilteredEmployees();
      this.updateFilteredEmployeeList();
      this.adjustmentCredit = 0;
      this.selectedEmployeeForDropdown = null;
      this.closeEmployeeAdjustModal();
    }
  }

  incrementAdjustmentCreditType(): void {
    this.adjustmentCreditType++;
  }
  decrementAdjustmentCreditType(): void {
    if (this.adjustmentCreditType > 0) this.adjustmentCreditType--;
  }
  setAdjustmentCreditType(value: number): void {
    this.adjustmentCreditType = value;
  }

  saveEmployeeTypeAdjustCredits(): void {
    if (this.selectedEmployeeTypeForDropdown) {
      const idx = this.employeeTypes.findIndex(e => e.id === this.selectedEmployeeTypeForDropdown!.id);
      if (idx !== -1) {
        this.employeeTypes[idx].accrued = this.adjustmentCreditType;
        // Auto-calculate remaining as accrued - used
        this.employeeTypes[idx].remaining = this.adjustmentCreditType - this.employeeTypes[idx].used;
        // Update all employees of this type
        const typeName = this.employeeTypes[idx].name;
        this.employees.forEach(emp => {
          if (emp.type === typeName) {
            emp.accrued = this.adjustmentCreditType;
            emp.remaining = this.adjustmentCreditType - emp.used;
          }
        });
        this.updateFilteredEmployees();
        this.updateFilteredEmployeeList();
      }
      this.selectedEmployeeTypeForDropdown = null;
      this.adjustmentCreditType = 0;
      this.closeEmployeeTypeAdjustModal();
    }
  }
} 