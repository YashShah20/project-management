import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children: RouteInfo[];
}

export const ADMIN_ROUTES: RouteInfo[] = [ 
  { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '', children: []},
  { path: 'projects', title: 'Projects', icon: 'projects', class: '', children: [] },
  { path: 'notifications', title: 'Notification', icon: 'notifications_active', class: '', children: [] },
  { path: 'users', title: 'Users', icon: 'user', class: '', children: [] },
  { path: 'user-profiles', title: 'User Profiles', icon: 'user', class: '', children: [] },
];

export const USER_ROUTES: RouteInfo[] = [
  { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '', children: []},
  { path: 'user-projects', title: 'Projects', icon: 'projects', class: '', children: [] },
  { path: 'user-notifications', title: 'Notification', icon: 'notifications_active', class: '', children: [] },
  { path: 'user-profile', title: 'Profile', icon: 'user', class: '', children: [] },
];

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  public menuItems!: any[];
  public isCollapsed = true;
  public isAdmin!: boolean;

  constructor(private router: Router, private auth: UserService, private toast: ToastrService) {}

  ngOnInit() {
    this.isAdmin = this.auth.is_admin
    console.log();
    
    
    // this.menuItems = ROUTES.filter((menuItem) => menuItem);
    // this.menuItems = ROUTES.filter((menuItem) => menuItem);
    if(this.isAdmin) {
      this.menuItems = ADMIN_ROUTES.filter((menuItem) => menuItem)
    } else {
      this.menuItems = USER_ROUTES.filter((menuItem) => menuItem)
    }

    this.menuItems  = this.isAdmin? ADMIN_ROUTES : USER_ROUTES
  }

  logOut() {
    this.auth.logOut();
    this.toast.warning("User Logged Out", 'Success')
  }

}
