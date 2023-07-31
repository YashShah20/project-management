import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
})
export class AllUsersComponent implements OnInit {
  userList: any;
  showAdd: any;
  constructor(
    private userService: UserService,
    private handler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.userService.fetchAllDevList().subscribe({
      next: (res) => {
        this.userList = res;
      },
      error: (error) => {
        this.handler.handle(error);
      },
    });
  }

  addUser($event: any) {
    this.userList.push($event);
    this.showAdd = false;
  }
}
