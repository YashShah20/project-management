import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  passType: string = 'password';
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;
  loader: boolean = false;

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private router: Router
  ) {}
  
  showHidePassword() {
    if (this.passType === 'text') {
      this.passType = 'password';
      this.eyeIcon = 'fa-eye-slash';
    } else {
      this.passType = 'text';
      this.eyeIcon = 'fa-eye';
    }
  }
  
  // credentials = { ...this.loginForm.value};


  onLoginFormSubmit() {
    if(this.loginForm.valid) {
      this.loader = true;
      this.userService
      .signin(this.loginForm.value)
      .subscribe({
        next: (res) => {
          this.cookieService.set('token', res?.token)
          // alert(`${this.loginForm.value['email']} Logged In`)
          console.log("Logged In.");

          this.userService.is_admin = res?.user.is_admin

          if(this.userService.is_admin) {
            this.toast.success(`${res.user.first_name} Logged In`, 'Success')
            this.router.navigate(['admin'])
          } else {
            this.toast.success(`${res.user.first_name} Logged In`, 'Success')
            this.router.navigate(['user'])
          }
          this.loader = false
        },
        error: (err) => {
          // alert(err?.error.message)          
          this.toast.error(err?.error, 'Error')
          this.loader = false
        }
      });
      
    } else {
      // throw the error with required fields
      this.validateAllFormFields(this.loginForm);
      this.toast.error("Invalid Fields", 'Error')
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if(control instanceof FormControl) {
        control.markAsDirty({onlySelf: true})
      } else if(control instanceof FormGroup) {
        this.validateAllFormFields(control)
      }
    })
  }

  ngOnInit(): void {
    this.cookieService.deleteAll();
    
    this.loginForm = this.fb.group({
      email: ['user1@project.com', [Validators.required, Validators.email]],
      password: ['abc', [Validators.required]]
    })
  }

}