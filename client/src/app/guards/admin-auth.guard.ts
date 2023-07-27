import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

// @Injectable({
//   providedIn: 'root'
// })

// export class adminAuthGuard implements CanActivate {

//   constructor(private userService: UserService, private router: Router) {}

//   canActivate() {
//     if(this.userService.isSignedIn()) {
//       this.router.navigate(['/admin-dashboard'])
//       return true;
//     } else {
//       this.router.navigate(['/sign-in'])
//       return false;
//     }
//   }

// };
let x = false
export const adminAuthGuard: CanActivateFn = (route, state) => {
  let auth = inject(UserService);
  let router = inject(Router);
  let toast = inject(ToastrService);
  let cookie = inject(CookieService);

  if (auth.isAdminSignedIn() ) {

    console.log('new auth guard true');
    
    // router.navigate(['admin'])
    return true;
  } else {
    console.log('admin auth guard false');
    toast.error('Unauthorised Access', 'Error');
    router.navigate(['']);
    return false;
  }
};
