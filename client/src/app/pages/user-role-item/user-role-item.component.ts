import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { UserRolesService } from 'src/app/services/user-roles.service';
import { USER_ACCESS_LEVEL } from './../../utils';
@Component({
  selector: 'app-user-role-item',
  templateUrl: './user-role-item.component.html',
  styleUrls: ['./user-role-item.component.scss'],
})
export class UserRoleItemComponent implements OnInit {
  @Input() role!: any;
  @Input() index!: any;

  @Output('roleUpdated') updateRoleEvent = new EventEmitter();
  @Output('roleDeleted') deleteteRoleEvent = new EventEmitter();

  showUpdate: any;
  accessLevel = USER_ACCESS_LEVEL;

  updatedRole = this.fb.group({
    title: ['', []],
    access_level: [0, []],
  });

  constructor(
    private fb: FormBuilder,
    private userRolesService: UserRolesService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.updatedRole.get('title')?.setValue(this.role.title);
    this.updatedRole.get('access_level')?.setValue(this.role.access_level);
  }

  updateRole() {
    this.userRolesService
      .updateRole(this.role?.id, this.updatedRole.value)
      .subscribe({
        next: (res) => {
          this.updateRoleEvent.emit(res);
        },
        error: (error) => {
          this.toast.error(error?.error, 'Error');
        },
      });
  }

  deleteRole() {
    this.userRolesService.deleteRole(this.role?.id).subscribe({
      next: (res) => {
        this.deleteteRoleEvent.emit(this.role.id);
      },
      error: (error) => {
        this.toast.error(error.error, 'Error');
      },
    });
  }
}
