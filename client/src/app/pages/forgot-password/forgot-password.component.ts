import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toast: ToastrService,
    private handler: ErrorHandlerService
  ) {}

  forgotPassword() {
    const isValid = this.forgotPasswordForm.valid;

    if (isValid) {
      this.userService.forgotPassword(this.forgotPasswordForm.value).subscribe({
        next: (res) => {
          this.toast.success('Password reset link sent', 'Success');
        },
        error: (error) => {
          this.handler.handle(error);
        },
      });
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}
