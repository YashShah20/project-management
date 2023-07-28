import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  @Output('userAdded') addUserEvent = new EventEmitter();

  user = this.fb.group({
    first_name: ['John', [Validators.required]],
    last_name: ['Doe', [Validators.required]],
    email: ['john@exelica.com', [Validators.required]],
    mobile_number: [9876543210, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toast: ToastrService
  ) {}

  addUser() {
    this.userService.addUser(this.user.value).subscribe({
      next: (res) => {
        this.addUserEvent.emit(res);
      },
      error: (error) => {
        if (Array.isArray(error.error)) {
          error.error.map((e: any) => {
            this.toast.error(`${e.msg} for ${e.path}`, 'Error');
          });
        } else {
          this.toast.error(error.error, 'Error');
        }
      },
    });
  }
}
