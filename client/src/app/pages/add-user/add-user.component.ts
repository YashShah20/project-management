import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
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
    // private toast: ToastrService,
    private handler: ErrorHandlerService
  ) {}

  addUser() {
    this.userService.addUser(this.user.value).subscribe({
      next: (res) => {
        this.addUserEvent.emit(res);
      },
      error: (error) => {
        this.handler.handle(error);
      },
    });
  }
}
