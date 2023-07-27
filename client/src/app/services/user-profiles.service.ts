import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class UserProfilesService {
  constructor(private http: HttpClient) {}

  getUserProfiles(): Observable<any> {
    return this.http.get(`${BASE_URL}/user-profile`);
  }

  addUserProfile(userProfile: any): Observable<any> {
    return this.http.post(`${BASE_URL}/user-profile/add`, userProfile);
  }

  updateUserProfile(id: any, userProfile: any): Observable<any> {
    return this.http.put(`${BASE_URL}/user-profile/${id}/update`, userProfile);
  }

  deleteUserProfile(id: any): Observable<any> {
    return this.http.delete(`${BASE_URL}/user-profile/${id}/delete`);
  }
}
