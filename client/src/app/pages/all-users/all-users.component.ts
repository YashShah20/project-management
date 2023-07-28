import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
})
export class AllUsersComponent implements OnInit {
  userList: any;
  showAdd: any;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.fetchAllDevList().subscribe({
      next: (res) => {
        this.userList = res;
      },
    });
  }

  addUser($event: any) {
    this.userList.push($event);
    this.showAdd = false;
  }
}
