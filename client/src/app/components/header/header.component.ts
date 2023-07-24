import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private auth: UserService, private toast: ToastrService) {}

  logout() {
    this.auth.logOut();
    this.toast.warning("User Logged Out", 'Success')
  }

}
