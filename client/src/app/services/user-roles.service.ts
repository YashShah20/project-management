import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class UserRolesService {
  constructor(private http: HttpClient) {}

  getRoles(): Observable<any> {
    return this.http.get(`${BASE_URL}/role`);
  }

  addRole(role: any): Observable<any> {
    return this.http.post(`${BASE_URL}/role/add`, role);
  }

  updateRole(id: any, role: any): Observable<any> {
    return this.http.put(`${BASE_URL}/role/${id}/update`, role);
  }

  deleteRole(id: any): Observable<any> {
    return this.http.delete(`${BASE_URL}/role/${id}/delete`);
  }
}
