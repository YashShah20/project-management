import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

export const userAuthGuard: CanActivateFn = (route, state) => {
  
  let auth = inject(UserService);
  let router = inject(Router);
  let toast = inject(ToastrService);
  let cookie = inject(CookieService);

  if (auth.isUserSignedIn() && !JSON.parse(cookie.get('user'))['user']['is_admin']) {
    console.log('auth guard true');
    // router.navigate(['user'])
    return true;
  } else {
    console.log('auth guard false');
    toast.error('Unauthorised Access', 'Error');
    router.navigate(['']);
    return false;
  }
  
};
