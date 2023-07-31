import { Injectable } from '@angular/core';
import { BASE_URL } from '../utils';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient, private router: Router) {}

  getProjects(page = 1, per_page = 5): Observable<any> {
    return this.http.get(
      `${BASE_URL}/project?page=${page}&per_page=${per_page}`
    );
  }

  getProjectTitles(): Observable<any> {
    return this.http.get(`${BASE_URL}/project/titles`);
  }

  getTasksByProjectId(id: any): Observable<any> {
    return this.http.get(`${BASE_URL}/project/${id}/tasks`);
  }

  getProjectById(id: any): Observable<any> {
    return this.http.get(`${BASE_URL}/project/${id}`);
  }

  addProject(project: any) {
    return this.http.post(`${BASE_URL}/project/add`, project);
  } // Admin ki api

  updateProject(id: any, project: any): Observable<any> {
    return this.http.put(`${BASE_URL}/project/${id}/update`, project);
  }

  updateProjectStatus(id: any, status: any): Observable<any> {
    return this.http.put(`${BASE_URL}/project/${id}/update-status`, status);
  }

  addProjectUsers(id: any, users: any) {
    return this.http.post(`${BASE_URL}/project/${id}/add-users`, users);
  }
}
