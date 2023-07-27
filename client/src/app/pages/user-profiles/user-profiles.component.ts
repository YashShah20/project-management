import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserProfilesService } from 'src/app/services/user-profiles.service';

@Component({
  selector: 'app-user-profiles',
  templateUrl: './user-profiles.component.html',
  styleUrls: ['./user-profiles.component.scss'],
})
export class UserProfilesComponent implements OnInit {
  userProfileList: any;
  showAdd: boolean = false;
  index: any;

  constructor(
    private userProfilesService: UserProfilesService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.userProfilesService.getUserProfiles().subscribe({
      next: (res) => {
        this.userProfileList = res;
      },
      error: (error) => {
        this.toast.error('Something went wrong', 'Error');
      },
    });
  }

  updateProfile(event: any) {
    this.userProfileList = this.userProfileList.map((profile: any) =>
      profile.id == event.id ? event : profile
    );
  }

  deleteProfile(event: any) {
    this.userProfileList = this.userProfileList.filter(
      (profile: any) => profile.id !== event.id
    );
  }

  addProfile(event: any) {
    this.showAdd = false;
    this.userProfileList.push(event);
  }
}
