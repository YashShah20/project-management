import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../utils';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserModel } from '../classes/user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {}

  is_admin: boolean = false;
  user!: UserModel;
  
  isSignedIn(): boolean {
    if(!!(this.cookieService.get('token'))) {
      console.log("user service cookie service true");
      return true;
    }
    else {
      console.log("user service cookie service false");
      return false;
    }
  }

  signin(credentials: any): Observable<any> {
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

  logOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/sign-in']);
  }
}
