import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PerformanceEmployee {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
  email: string;
  number?: string;
  department: string;
  position: string;
  performanceScore: number;
  satisfaction: number;
  resolutionTime: string;
  retentionRate: number;
  monthlySatisfaction?: number[]; // 6 months
  monthlyResolutionTime?: number[]; // 6 months, in hours
}

interface DepartmentStat {
  name: string;
  count: number;
  percentage: number;
}

interface Office {
  name: string;
  departments: DepartmentStat[];
}

@Component({
  selector: 'app-performance-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class PerformanceManagementComponent {
  title = 'Performance Management';
  performanceFeatures = [
    { name: 'Goal Setting', description: 'Set and track employee goals', icon: '🎯' },
    { name: 'Performance Reviews', description: 'Conduct and record performance reviews', icon: '📝' },
    { name: 'Feedback', description: 'Give and receive feedback', icon: '💬' },
    { name: 'Appraisal History', description: 'View past appraisals and ratings', icon: '📈' },
    { name: 'Recognition', description: 'Recognize outstanding performance', icon: '🏆' },
    { name: 'Development Plans', description: 'Create and monitor development plans', icon: '🗂️' }
  ];

  offices: Office[] = [
    {
      name: 'Head Office',
      departments: [
        { name: 'IT', count: 45, percentage: 30 },
        { name: 'Human Resources', count: 30, percentage: 20 },
        { name: 'Finance', count: 25, percentage: 17 },
        { name: 'Marketing', count: 20, percentage: 13 },
        { name: 'Operations', count: 30, percentage: 20 },
        { name: 'Graphics', count: 20, percentage: 40 }
      ]
    },
    {
      name: 'Regional Office',
      departments: [
        { name: 'IT', count: 20, percentage: 25 },
        { name: 'Finance', count: 15, percentage: 19 },
        { name: 'Marketing', count: 10, percentage: 12 },
        { name: 'Operations', count: 25, percentage: 31 },
        { name: 'Support', count: 10, percentage: 13 }
      ]
    },
    {
      name: 'Branch Office',
      departments: [
        { name: 'IT', count: 10, percentage: 20 },
        { name: 'Finance', count: 8, percentage: 16 },
        { name: 'Sales', count: 22, percentage: 44 },
        { name: 'Support', count: 10, percentage: 20 }
      ]
    }
  ];

  selectedOffice: string = this.offices[0].name;
  selectedDepartment: string = '';

  employees: PerformanceEmployee[] = [
    {
      id: 1,
      firstName: 'Ethan',
      lastName: 'Harper',
      email: 'ethan.harper@acme.com',
      department: 'Sales',
      position: 'Sales Executive',
      performanceScore: 80,
      satisfaction: 85,
      resolutionTime: '26 hours',
      retentionRate: 90,
      monthlySatisfaction: [60, 75, 90, 70, 85, 80, 81, 56, 34, 65, 29, 69],
      monthlyResolutionTime: [28, 27, 26, 25, 24, 26, 23, 29, 22, 30, 21, 28]
    },
    {
      id: 2,
      firstName: 'Olivia',
      lastName: 'Bennett',
      email: 'olivia.bennett@acme.com',
      department: 'Support',
      position: 'Support Specialist',
      performanceScore: 90,
      satisfaction: 90,
      resolutionTime: '22 hours',
      retentionRate: 95,
      monthlySatisfaction: [95, 80, 85, 70, 90, 60, 82, 76, 64, 58, 73, 88],
      monthlyResolutionTime: [24, 23, 22, 21, 20, 22, 25, 24, 23, 19, 20, 21]
    },
    {
      id: 3,
      firstName: 'Noah',
      lastName: 'Carter',
      email: 'noah.carter@acme.com',
      department: 'Marketing',
      position: 'Marketing Analyst',
      performanceScore: 85,
      satisfaction: 88,
      resolutionTime: '24 hours',
      retentionRate: 92,
      monthlySatisfaction: [70, 60, 80, 90, 75, 85, 65, 77, 84, 68, 79, 72],
      monthlyResolutionTime: [26, 25, 24, 23, 22, 24, 23, 27, 25, 26, 22, 28]
    },
    {
      id: 4,
      firstName: 'Ava',
      lastName: 'Morgan',
      email: 'ava.morgan@acme.com',
      department: 'Product',
      position: 'Product Manager',
      performanceScore: 75,
      satisfaction: 80,
      resolutionTime: '28 hours',
      retentionRate: 88,
      monthlySatisfaction: [80, 90, 60, 85, 70, 95, 66, 78, 83, 59, 62, 86],
      monthlyResolutionTime: [30, 29, 28, 27, 26, 28, 25, 29, 30, 31, 28, 27]
    },
    {
      id: 5,
      firstName: 'Liam',
      lastName: 'Foster',
      email: 'liam.foster@acme.com',
      department: 'Sales',
      position: 'Sales Associate',
      performanceScore: 95,
      satisfaction: 92,
      resolutionTime: '20 hours',
      retentionRate: 98,
      monthlySatisfaction: [90, 60, 95, 80, 65, 100, 88, 72, 91, 85, 66, 94],
      monthlyResolutionTime: [22, 21, 20, 19, 18, 20, 19, 21, 18, 22, 17, 20]
    },
    {
      id: 6,
      firstName: 'Sophia',
      lastName: 'Kim',
      email: 'sophia.kim@acme.com',
      department: 'Finance',
      position: 'Financial Analyst',
      performanceScore: 78,
      satisfaction: 83,
      resolutionTime: '30 hours',
      retentionRate: 88,
      monthlySatisfaction: [85, 70, 60, 95, 80, 75, 67, 90, 88, 74, 61, 77],
      monthlyResolutionTime: [32, 31, 30, 29, 28, 30, 27, 33, 31, 32, 29, 28]
    },
    {
      id: 7,
      firstName: 'Lucas',
      lastName: 'Wright',
      email: 'lucas.wright@acme.com',
      department: 'Operations',
      position: 'Operations Coordinator',
      performanceScore: 81,
      satisfaction: 79,
      resolutionTime: '27 hours',
      retentionRate: 85,
      monthlySatisfaction: [60, 95, 70, 80, 90, 65, 73, 69, 88, 76, 58, 63],
      monthlyResolutionTime: [29, 28, 27, 26, 25, 27, 26, 30, 28, 29, 24, 26]
    },
    {
      id: 8,
      firstName: 'Mia',
      lastName: 'Garcia',
      email: 'mia.garcia@acme.com',
      department: 'Graphics',
      position: 'Graphic Designer',
      performanceScore: 90,
      satisfaction: 91,
      resolutionTime: '16 hours',
      retentionRate: 97,
      monthlySatisfaction: [100, 85, 60, 75, 95, 80, 90, 67, 88, 79, 73, 96],
      monthlyResolutionTime: [18, 17, 16, 15, 14, 16, 17, 18, 15, 14, 16, 15]
    },
    {
      id: 9,
      firstName: 'Evelyn',
      lastName: 'Tran',
      email: 'evelyn.tran@acme.com',
      department: 'IT',
      position: 'IT Specialist',
      performanceScore: 86,
      satisfaction: 89,
      resolutionTime: '19 hours',
      retentionRate: 94,
      monthlySatisfaction: [70, 100, 80, 60, 90, 85, 79, 74, 66, 89, 95, 84],
      monthlyResolutionTime: [21, 20, 19, 18, 17, 19, 18, 22, 20, 21, 17, 20]
    },
    {
      id: 10,
      firstName: 'Henry',
      lastName: 'Santos',
      email: 'henry.santos@acme.com',
      department: 'Human Resources',
      position: 'HR Manager',
      performanceScore: 80,
      satisfaction: 84,
      resolutionTime: '25 hours',
      retentionRate: 90,
      monthlySatisfaction: [60, 80, 100, 70, 85, 90, 91, 77, 82, 88, 86, 92],
      monthlyResolutionTime: [27, 26, 25, 24, 23, 25, 26, 28, 27, 29, 24, 26]
    }    
  ];

  get departmentStats(): DepartmentStat[] {
    const office = this.offices.find(o => o.name === this.selectedOffice);
    return office ? office.departments : [];
  }

  get filteredDepartments(): DepartmentStat[] {
    if (!this.selectedDepartment) return this.departmentStats;
    return this.departmentStats.filter(d => d.name === this.selectedDepartment);
  }

  // Filtered employees based on selected office and department
  get filteredEmployees(): PerformanceEmployee[] {
    let emps = this.employees;
    if (this.selectedDepartment) {
      emps = emps.filter(e => e.department === this.selectedDepartment);
    } else if (this.selectedOffice) {
      // Optionally, filter by office if you map employees to offices
      // For now, all employees are global
    }
    return emps;
  }

  // KPIs based on filtered employees
  get overallSatisfaction(): string {
    const emps = this.filteredEmployees;
    if (!emps.length) return 'N/A';
    const avg = emps.reduce((sum, e) => sum + e.satisfaction, 0) / emps.length;
    return avg ? avg.toFixed(0) + '%' : 'N/A';
  }

  get avgResolutionTime(): string {
    const emps = this.filteredEmployees;
    if (!emps.length) return 'N/A';
    // Convert all resolution times to hours (assume format 'X hours')
    const totalHours = emps.reduce((sum, e) => {
      const match = e.resolutionTime.match(/(\d+)/);
      return sum + (match ? parseInt(match[1], 10) : 0);
    }, 0);
    const avg = totalHours / emps.length;
    return avg ? avg.toFixed(0) + ' hours' : 'N/A';
  }

  get avgRetentionRate(): string {
    const emps = this.filteredEmployees;
    if (!emps.length) return 'N/A';
    const avg = emps.reduce((sum, e) => sum + e.retentionRate, 0) / emps.length;
    return avg ? avg.toFixed(0) + '%' : 'N/A';
  }

  // Example for template use
  get employeeTable() {
    return this.filteredEmployees;
  }

  get departmentTable() {
    return this.departmentStats;
  }

  // Satisfaction Trends: average satisfaction for each of the last 6 months based on selected filters
  get satisfactionTrends(): number[] {
    const emps = this.filteredEmployees;
    const months = 6;
    if (!emps.length) return Array(months).fill(0);
    const trends: number[] = [];
    for (let i = 0; i < months; i++) {
      const avg = emps.reduce((sum, e) => sum + (e.monthlySatisfaction ? e.monthlySatisfaction[i] : 0), 0) / emps.length;
      trends.push(Number(avg.toFixed(2)));
    }
    return trends;
  }

  // Resolution Time by Department: average for the last month (6th month)
  get resolutionTimeByDepartment(): { [dept: string]: number } {
    const result: { [dept: string]: number } = {};
    const depts = this.departmentStats.map(d => d.name);
    for (const dept of depts) {
      const emps = this.employees.filter(e => e.department === dept);
      if (emps.length) {
        const avg = emps.reduce((sum, e) => sum + (e.monthlyResolutionTime ? e.monthlyResolutionTime[5] : 0), 0) / emps.length;
        result[dept] = Number(avg.toFixed(2));
      } else {
        result[dept] = 0;
      }
    }
    return result;
  }

  // --- SVG path helpers for Satisfaction Trends ---
  getSatisfactionTrendsPath(trends: number[]): string {
    if (!trends || trends.length !== 6) return '';
    // SVG: width 472, height 148, y=0 is top, y=148 is bottom
    // We'll map 100% to y=20, 0% to y=130 for a nice margin
    const xStep = 472 / 5;
    const yMin = 20, yMax = 130;
    const points = trends.map((v, i) => {
      const y = yMax - ((v / 100) * (yMax - yMin));
      return { x: i * xStep, y };
    });
    // Area path: move to first, line through all, then down to bottom right, left, and close
    let d = `M${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L${points[i].x},${points[i].y}`;
    }
    d += ` L${points[5].x},148 L0,148 Z`;
    return d;
  }

  getSatisfactionTrendsLine(trends: number[]): string {
    if (!trends || trends.length !== 6) return '';
    const xStep = 472 / 5;
    const yMin = 20, yMax = 130;
    const points = trends.map((v, i) => {
      const y = yMax - ((v / 100) * (yMax - yMin));
      return { x: i * xStep, y };
    });
    let d = `M${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L${points[i].x},${points[i].y}`;
    }
    return d;
  }

  getMaxDeptResolutionTime(): number {
    const vals = this.departmentStats.map(d => this.resolutionTimeByDepartment[d.name]);
    return vals.length ? Math.max(...vals) : 1;
  }

  // Color palette for department bars (base RGB, alpha applied dynamically)
  private departmentColors: { [key: string]: [number, number, number] } = {
    'IT': [37, 99, 235], // blue
    'Human Resources': [16, 185, 129], // green
    'Finance': [234, 179, 8], // yellow
    'Marketing': [236, 72, 153], // pink
    'Operations': [251, 191, 36], // amber
    'Graphics': [168, 85, 247], // purple
    'Support': [59, 130, 246], // light blue
    'Sales': [239, 68, 68], // red
    'Product': [34, 197, 94], // green
    'Regional': [14, 165, 233], // cyan
    'Branch': [251, 113, 133], // rose
  };

  getDepartmentBarColor(deptName: string, alpha: number = 0.5): string {
    const rgb = this.departmentColors[deptName] || [100, 116, 139]; // fallback: slate
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
  }
} 