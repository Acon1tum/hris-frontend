import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Employee {
  id: string;
  name: string;
  monthlySalary: number;
  bankAccountInfo: string;
  salaryAdjustments: number;
  loanBalances: number;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-master-payroll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './master-payroll.component.html',
  styleUrls: ['./master-payroll.component.scss']
})
export class MasterPayrollComponent {
  searchTerm = '';
  
  employees: Employee[] = [
    {
      id: 'EMP001',
      name: 'Ethan Carter',
      monthlySalary: 5000.00,
      bankAccountInfo: 'Bank of America ...1234',
      salaryAdjustments: 200.00,
      loanBalances: 1000.00,
      status: 'Active'
    },
    {
      id: 'EMP002',
      name: 'Olivia Bennett',
      monthlySalary: 6000.00,
      bankAccountInfo: 'Chase ...5678',
      salaryAdjustments: 150.00,
      loanBalances: 500.00,
      status: 'Active'
    },
    {
      id: 'EMP003',
      name: 'Noah Thompson',
      monthlySalary: 4500.00,
      bankAccountInfo: 'Wells Fargo ...9012',
      salaryAdjustments: 100.00,
      loanBalances: 200.00,
      status: 'Inactive'
    },
    {
      id: 'EMP004',
      name: 'Ava Martinez',
      monthlySalary: 5500.00,
      bankAccountInfo: 'Citibank ...3456',
      salaryAdjustments: 250.00,
      loanBalances: 750.00,
      status: 'Active'
    },
    {
      id: 'EMP005',
      name: 'Liam Harris',
      monthlySalary: 7000.00,
      bankAccountInfo: 'Capital One ...7890',
      salaryAdjustments: 300.00,
      loanBalances: 1200.00,
      status: 'Active'
    },
    {
      id: 'EMP006',
      name: 'Isabella Clark',
      monthlySalary: 4800.00,
      bankAccountInfo: 'US Bank ...2468',
      salaryAdjustments: 180.00,
      loanBalances: 300.00,
      status: 'Inactive'
    }
  ];

  onAddEmployee() {
    console.log('Add new employee clicked');
  }

  onEditEmployee(employee: Employee) {
    console.log('Edit employee:', employee.name);
  }

  onDeleteEmployee(employee: Employee) {
    console.log('Delete employee:', employee.name);
  }

  onExport() {
    console.log('Export data clicked');
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
  }

  get filteredEmployees() {
    if (!this.searchTerm) {
      return this.employees;
    }
    return this.employees.filter(employee => 
      employee.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  trackByEmployeeId(index: number, employee: Employee): string {
    return employee.id;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
} 