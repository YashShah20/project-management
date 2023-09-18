import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{

  user!: any;
  loader: boolean = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (profile) => {
      this.user = profile;

      setTimeout(() => {
        this.loader = false;
      }, 500);
      console.log(profile);
      
    },
    error: (err) => {
      console.log('Error Occured: ', err);
      this.loader = false
    }})
  }

}
