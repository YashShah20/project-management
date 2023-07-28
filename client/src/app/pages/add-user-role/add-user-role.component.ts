import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserRolesService } from 'src/app/services/user-roles.service';
import { USER_ACCESS_LEVEL } from 'src/app/utils';

@Component({
  selector: 'app-add-user-role',
  templateUrl: './add-user-role.component.html',
  styleUrls: ['./add-user-role.component.scss'],
})
export class AddUserRoleComponent {
  @Output('roleAdded') addRoleEvent = new EventEmitter();
  accessLevel: any = USER_ACCESS_LEVEL;

  constructor(
    private fb: FormBuilder,
    private userRolesService: UserRolesService,
    private toast: ToastrService
  ) {}

  userRole = this.fb.group({
    title: ['', [Validators.required]],
    access_level: [0, [Validators.required]],
  });

  addRole() {
    this.userRolesService.addRole(this.userRole.value).subscribe({
      next: (res) => {
        this.addRoleEvent.emit(res);
      },
      error: (error) => {
        this.toast.error(error.error, 'Error');
      },
    });
  }
}
