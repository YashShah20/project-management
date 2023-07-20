import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  passType: string = "password";
  cnfPassType: string = "password";
  eyeIcon: string = "fa-eye-slash"
  cnfEyeIcon: string = "fa-eye-slash"
  
  showHidePassword() {
    if(this.passType === "text") {
      this.passType = "password";
      this.eyeIcon = "fa-eye-slash"
    } else {
      this.passType = "text";
      this.eyeIcon = "fa-eye"
    }
  }

  cnfShowHidePassword() {
    if(this.cnfPassType === "text") {
      this.cnfPassType = "password";
      this.cnfEyeIcon = "fa-eye-slash"
    } else {
      this.cnfPassType = "text";
      this.cnfEyeIcon = "fa-eye"
    }
  }

}
