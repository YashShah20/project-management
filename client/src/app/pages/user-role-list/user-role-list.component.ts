import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserRolesService } from 'src/app/services/user-roles.service';

@Component({
  selector: 'app-user-role-list',
  templateUrl: './user-role-list.component.html',
  styleUrls: ['./user-role-list.component.scss'],
})
export class UserRoleListComponent implements OnInit {
  showAdd: boolean = false;
  userRoleList: any;

  constructor(
    private userRolesService: UserRolesService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.userRolesService.getRoles().subscribe({
      next: (res) => {
        this.userRoleList = res;
      },
      error: (error) => {
        this.toast.error(error.error,"Error");
      },
    });
  }

  addRole($event: any) {
    this.userRoleList.push($event);
    this.showAdd = !this.showAdd;
  }

  updateRole($event: any) {
    this.userRoleList = this.userRoleList.map((role: any) =>
      role.id == $event.id ? $event : role
    );
  }

  deleteRole($id: any) {
    this.userRoleList = this.userRoleList.filter((role: any) => role.id != $id);
  }
}
