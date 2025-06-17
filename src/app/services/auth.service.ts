import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  name: string;
  avatar?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  HR_MANAGER = 'hr_manager',
  HR_STAFF = 'hr_staff',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
  GUEST = 'guest'
}

export interface MenuItem {
  name: string;
  path: string;
  icon: string;
  badge?: string;
  roles: UserRole[];
  children?: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(username: string, password: string): Observable<User> {
    // Mock login - in real app, this would call an API
    return new Observable(observer => {
      setTimeout(() => {
        let user: User;
        
        // Demo users based on username
        switch (username.toLowerCase()) {
          case 'admin':
            user = {
              id: 1,
              username: 'admin',
              email: 'admin@company.com',
              role: UserRole.ADMIN,
              name: 'System Administrator',
              avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
            };
            break;
          case 'hr':
            user = {
              id: 2,
              username: 'hr',
              email: 'hr@company.com',
              role: UserRole.HR_MANAGER,
              name: 'HR Manager',
              avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
            };
            break;
          case 'manager':
            user = {
              id: 3,
              username: 'manager',
              email: 'manager@company.com',
              role: UserRole.MANAGER,
              name: 'Department Manager',
              avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
            };
            break;
          case 'employee':
            user = {
              id: 4,
              username: 'employee',
              email: 'employee@company.com',
              role: UserRole.EMPLOYEE,
              name: 'Regular Employee',
              avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
            };
            break;
          default:
            user = {
              id: 5,
              username: 'guest',
              email: 'guest@company.com',
              role: UserRole.GUEST,
              name: 'Guest User',
              avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
            };
        }

        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        observer.next(user);
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  hasRole(role: UserRole): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  hasAnyRole(roles: UserRole[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }

  canAccess(requiredRoles: UserRole[]): boolean {
    return this.hasAnyRole(requiredRoles);
  }
} 