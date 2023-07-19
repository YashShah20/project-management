import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  passType: string = "password";
  eyeIcon: string = "fa-eye-slash"
  
  showHidePassword() {
    if(this.passType === "text") {
      this.passType = "password";
      this.eyeIcon = "fa-eye-slash"
    } else {
      this.passType = "text";
      this.eyeIcon = "fa-eye"
    }
  }

}
