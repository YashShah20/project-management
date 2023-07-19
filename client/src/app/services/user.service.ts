import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  signin(credentials: any) {
    return this.http.post(`${BASE_URL}/user/signin`, credentials);
  }

  getProfile() {
    return this.http.get(`${BASE_URL}/user/profile`);
  }

  updateProfile(user: any) {
    return this.http.put(`${BASE_URL}/user/profile/update`, user);
  }

  updatePassword(credentials: any) {
    return this.http.put(`${BASE_URL}/user/password/update`, credentials);
  }

  forgotPassword(user: any) {
    return this.http.post(`${BASE_URL}/user/forgot-password`, user);
  }

  resetPassword(credentials: any) {
    return this.http.post(`${BASE_URL}/user/reset-password`, credentials);
  }
}
