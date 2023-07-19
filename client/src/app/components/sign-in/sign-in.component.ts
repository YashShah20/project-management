import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  passType: string = 'password';
  eyeIcon: string = 'fa-eye-slash';

  constructor(
    private userService: UserService,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.userService
      .signin({
        email: 'admin@gmail.com',
        password: 'abc',
      })
      .subscribe((res) => {

        this.cookieService.set('token', res?.token);
      });
  }

  showHidePassword() {
    if (this.passType === 'text') {
      this.passType = 'password';
      this.eyeIcon = 'fa-eye-slash';
    } else {
      this.passType = 'text';
      this.eyeIcon = 'fa-eye';
    }
  }
}
