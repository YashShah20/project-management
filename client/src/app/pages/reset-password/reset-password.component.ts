import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  // token: any;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private handler: ErrorHandlerService,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  resetPasswordForm = this.fb.group({
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  resetPassword() {
    const isValid = this.resetPasswordForm.valid;

    if (isValid) {
      let token;
      this.route.queryParams.subscribe((param) => {
        token = param['token'];
      });

      this.userService
        .resetPassword(token, this.resetPasswordForm.value)
        .subscribe({
          next: (res) => {
            this.router.navigate(['/sign-in']);
          },
          error: (error) => {
            this.handler.handle(error);
          },
        });
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }
}
