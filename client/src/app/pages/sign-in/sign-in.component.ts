import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  loginForm!: FormGroup;

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private fb: FormBuilder
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
      this.userService
      .signin(this.loginForm.value)
      .subscribe({
        next: (res) => {
          this.cookieService.set('token', res?.token)
          alert(`${this.loginForm.value['email']} Logged In`)
          console.log("Logged In.");
        },
        error: (err) => {
          // alert(err?.error.message)          
          alert(err?.error)
        }
      });
      
    } else {
      // throw the error with required fields
      this.validateAllFormFields(this.loginForm);
      alert("Invalid Form")
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
    this.loginForm = this.fb.group({
      email: ['admin@gmail.com', [Validators.required, Validators.email]],
      password: ['abc', [Validators.required]]
    })
  }

}