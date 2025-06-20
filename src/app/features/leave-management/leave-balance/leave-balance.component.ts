import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Employee {
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
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLakjcv3GTevMA4RWIJGxC8TXAcsihS02nkLM6AUMQ0tfRpxUZNcF59cgev20q6-wU6hbA8GYpJamRqRAeUpBzw4HKajtqKB-Zit8oqqXLrtpJOWlG-d0xrWyZ43tqgjR2b9PkffshikRechuPY8e-Q_W5B3lsPafTGOkyS1ku_raUytqoG2VMm6DWPeGAg79GST8G5CY53H7fgwfIn5XoTVhpxtve-ciCEqRs2gg12WFe0D4CI4la6IUUT3oFzRWtnKAJkwry2pgb',
      accrued: 20,
      used: 12,
      remaining: 8,
      expiring: 2
    },
    {
      id: 'OB1002',
      name: 'Olivia Bennett',
      department: 'Sales',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4ZhVbGKrvnJ-hHIbZNkviJAdAdryAWGmkx51mS-MQwVu9zJXdSiI-3fjR3gd296fD09cVpHcSgVBGbUGDMnHrULMToSZPgBxAU1CqvN2kxbXgTcBCSriFvsiwXQJtwiab2ZGKlUbyZblkZdxbACPGz6Eo4f47ztC5gTeiQ5DC9ou3GNAiBu-F9Kng8eJ6XeLnz6QTSk3R9Ac8yb522KHQ0yu4xNuNQ59YsameMGBZzRu5yAQtKpi4tr567nAw61PpcLnaYD2vyjFg',
      accrued: 15,
      used: 10,
      remaining: 5,
      expiring: 1
    },
    {
      id: 'NT1003',
      name: 'Noah Thompson',
      department: 'Engineering',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNFV9TfaYpn9M8_I0v-n9qWyRQ8to2YJ3CDs5gKFtZx312cYBMUBjK1sGbLvn8OoqUpSjgZvtNFpzVqSKlMd7c0S6cp032_xFsoRRg6nd5-ak4Jy-zu1oxMbpieiFrnyWna6mNYhqY5IUfWOEeRkvq484x1lGie8sbPiF8ip-xrNHRm5U2mi8x9oVvt6cVOJne7kyqJNtHG5OI3UnqY_GIW-djzUjdAiQNzV8PCV4hDjuTmw4qgtjnAcZqAagfQjleXxZ8ik6YNrtD',
      accrued: 22,
      used: 15,
      remaining: 7,
      expiring: 3
    },
    {
      id: 'AM1004',
      name: 'Ava Martinez',
      department: 'Product',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc1Ei-2QhtIR4Vs1IgF0Bb8RCpEEVRsIlZhJ0f8BzkW7GdvVor0ZbPBDkRphGJYH_TFPCLdGeLUGdnpzgZVJ8AMFmTVm9mKwCaof9piT_rWqpwVQ5KpugUAJSzUJE_r69Qk3efJSzFEXysZq3oKTOAw5vGQQly7hxPOJ65UkMBHERSt9toRaBACSHe5ykJ18TdU13STHa2tO4t20v9h6jXl0LRiA6OVSDz69D4V1yrtD6s6F8f7epgBMHswOgHZyPMC_jW-T-Zf1xl',
      accrued: 18,
      used: 11,
      remaining: 7,
      expiring: 2
    },
    {
      id: 'LH1005',
      name: 'Liam Harris',
      department: 'Customer Support',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK8N4fY8JMJpdAe34vAySLz5D7RgB2dX-hTYiXRLrOLzAEQTtt2Bt5N7cS2eh5E9oqTL_MP6rO_xP6kSm77wWoAiaoepIpeiLFF53TzwH-dYsihvlX-l9axQSJp25LVHxZi2hsU4NYFUFxOEIfGYmYrTX6hoXry1HI_9jMbskw1gVTxdnYI5Z42PEEanu7mHH1WvM-d-McuVQ5v23c3fuIuJQfQb_B2gHlg44Ro3Wd3F8KgYabzr69gVJGkUi7LfFVAzsprz_pC99O',
      accrued: 16,
      used: 9,
      remaining: 7,
      expiring: 1
    }
  ];

  filteredEmployees = [...this.employees];
  currentPage = 1;
  itemsPerPage = 5;
  totalResults = this.employees.length;

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

  adjustCredits(): void {
    // Implementation for adjusting credits
    console.log('Adjust credits clicked');
  }

  viewDetails(employee: Employee): void {
    // Implementation for viewing employee details
    console.log('View details for:', employee.name);
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
} 