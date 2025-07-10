// Fade-in animation for personnel-201-file is handled in the component's HTML and SCSS via the .fade-in-smooth class.
import { Injectable } from '@angular/core';
import { Observable, throwError, firstValueFrom } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface Personnel201File {
  id: string;
  employeeName: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  suffix?: string;
  email?: string;
  contact_number?: string;
  address?: string;
  department: string;
  departmentName?: string;
  position: string;
  designation?: string;
  dateCreated: string;
  lastModified: string;
  createdBy: string;
  modifiedBy: string;
  auditTrail: AuditTrailEntry[];
  fileName?: string;
  profilePictureUrl?: string;
  profilePictureFile?: File | null;
  date_of_birth?: string;
  gender?: string;
  civil_status?: string;
  citizenship?: string;
  employment_type?: string;
  date_hired?: string;
  employment_status?: string;
  salary?: number;
  gsis_number?: string;
  pagibig_number?: string;
  philhealth_number?: string;
  sss_number?: string;
  tin_number?: string;
  dependents?: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
  emergencyContactRelationship?: string;
  user?: {
    id: string;
    username: string;
    email: string;
    status: string;
  };
  jobLevel?: string;
  jobGrade?: string;
}

export interface AuditTrailEntry {
  action: 'create' | 'edit' | 'delete';
  timestamp: string;
  user: string;
  details: string;
}

export interface PersonnelCreateRequest {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  date_of_birth?: string;
  gender?: string;
  civil_status?: string;
  contact_number?: string;
  address?: string;
  department_id?: string;
  designation?: string;
  employment_type: string;
  date_hired: string;
  salary: number;
  gsis_number?: string;
  pagibig_number?: string;
  philhealth_number?: string;
  sss_number?: string;
  tin_number?: string;
  profile_picture?: string;
}

export interface PersonnelUpdateRequest {
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  date_of_birth?: string;
  gender?: string;
  civil_status?: string;
  contact_number?: string;
  address?: string;
  department_id?: string;
  designation?: string;
  employment_type?: string;
  date_hired?: string;
  salary?: number;
  gsis_number?: string;
  pagibig_number?: string;
  philhealth_number?: string;
  sss_number?: string;
  tin_number?: string;
}

@Injectable({
  providedIn: 'root'
})
export class Personnel201Service {
  private readonly apiUrl = `${environment.apiUrl}/personnel`;

  constructor(private http: HttpClient) {}

  getPersonnelFiles(page: number = 1, limit: number = 10, search?: string, department?: string): Observable<{
    data: Personnel201File[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (search) {
      params = params.set('search', search);
    }

    if (department) {
      params = params.set('department', department);
    }

    return this.http.get<any>(`${this.apiUrl}`, { params }).pipe(
      map(response => ({
        data: response.data.map((personnel: any) => this.transformPersonnelData(personnel)),
        pagination: response.pagination
      })),
      catchError(this.handleError)
    );
  }

  getPersonnelById(id: string): Observable<Personnel201File> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => this.transformPersonnelData(response.data)),
      catchError(this.handleError)
    );
  }

  createPersonnel(personnelData: PersonnelCreateRequest): Observable<Personnel201File> {
    return this.http.post<any>(`${this.apiUrl}`, personnelData).pipe(
      map(response => this.transformPersonnelData(response.data)),
      catchError(this.handleError)
    );
  }

  updatePersonnel(id: string, personnelData: PersonnelUpdateRequest): Observable<Personnel201File> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, personnelData).pipe(
      map(response => this.transformPersonnelData(response.data)),
      catchError(this.handleError)
    );
  }

  deletePersonnel(id: string): Observable<void> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      map(() => void 0),
      catchError(this.handleError)
    );
  }

  getPersonnelStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  getDepartments(): Observable<{id: string, department_name: string}[]> {
    return this.http.get<any>(`${environment.apiUrl}/system/departments`).pipe(
      map(response => response.data || []),
      catchError(this.handleError)
    );
  }

  getUniquePositions(): Observable<string[]> {
    return this.getPersonnelFiles().pipe(
      map(response => Array.from(new Set(response.data.map((f: any) => f.position).filter(Boolean))))
    );
  }

  // Helper method to map department name to ID
  async getDepartmentIdByName(departmentName: string): Promise<string | undefined> {
    try {
      console.log('🔍 getDepartmentIdByName called with:', departmentName);
      
      const departments = await firstValueFrom(this.getDepartments());
      console.log('📋 All available departments:', departments);
      
      if (!departments || departments.length === 0) {
        console.warn('⚠️ No departments available!');
        return undefined;
      }

      const department = departments.find(dept => {
        const match = dept.department_name.toLowerCase().trim() === departmentName.toLowerCase().trim();
        console.log(`🔎 Comparing "${dept.department_name}" with "${departmentName}" = ${match}`);
        return match;
      });
      
      console.log('🏢 Department mapping result:', {
        searchFor: departmentName,
        found: department,
        mappedId: department?.id
      });
      
      if (!department) {
        console.error('❌ Department not found! Available departments:', 
          departments.map(d => d.department_name).join(', '));
      }
      
      return department?.id;
    } catch (error) {
      console.error('❌ Error getting department ID:', error);
      return undefined;
    }
  }

  // Transform backend data to frontend format
  private transformPersonnelData(data: any): Personnel201File {
    const fullName = [data.first_name, data.middle_name, data.last_name]
      .filter(Boolean)
      .join(' ');

    let profilePictureUrl = '';
    if (data.user && data.user.profile_picture) {
      profilePictureUrl = data.user.profile_picture;
    }

    return {
      id: data.id,
      employeeName: fullName,
      firstName: data.first_name,
      middleName: data.middle_name,
      lastName: data.last_name,
      email: data.user?.email,
      contact_number: data.contact_number,
      address: data.address,
      department: data.department?.department_name || 'N/A',
      departmentName: data.department?.department_name,
      position: data.designation || 'N/A',
      designation: data.designation,
      dateCreated: data.created_at ? new Date(data.created_at).toISOString().slice(0, 10) : '',
      lastModified: data.updated_at ? new Date(data.updated_at).toISOString().slice(0, 10) : '',
      createdBy: 'System', // You can enhance this based on your audit requirements
      modifiedBy: 'System',
      auditTrail: [], // You can populate this from audit logs if available
      date_of_birth: data.date_of_birth ? new Date(data.date_of_birth).toISOString().slice(0, 10) : '',
      gender: data.gender,
      civil_status: data.civil_status,
      employment_type: data.employment_type,
      date_hired: data.date_hired ? new Date(data.date_hired).toISOString().slice(0, 10) : '',
      salary: data.salary,
      gsis_number: data.gsis_number,
      pagibig_number: data.pagibig_number,
      philhealth_number: data.philhealth_number,
      sss_number: data.sss_number,
      tin_number: data.tin_number,
      user: data.user,
      profilePictureUrl: profilePictureUrl,
      profilePictureFile: null,
      jobLevel: data.jobLevel || '',
      jobGrade: data.jobGrade || '',
    };
  }

  private handleError = (error: HttpErrorResponse) => {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = error.error?.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error('Personnel Service Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  };

  uploadDocuments(personnelId: string, documents: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${personnelId}/documents`, { documents });
  }
} 