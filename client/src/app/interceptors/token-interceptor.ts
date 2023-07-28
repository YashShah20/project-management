import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from '../services/project.service';
import { UserProfilesService } from '../services/user-profiles.service';
import { UserRolesService } from '../services/user-roles.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private userService: UserService,
    private projectService: ProjectService,
    private userProfilesService: UserProfilesService,
    private userRolesService: UserRolesService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('token');
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(authReq);
  }
}
