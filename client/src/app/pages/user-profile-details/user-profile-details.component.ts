import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { UserProfilesService } from 'src/app/services/user-profiles.service';

@Component({
  selector: 'app-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.scss'],
})
export class UserProfileDetailsComponent implements OnInit {
  @Input() profile!: any;
  @Input() index: any;

  showUpdate: boolean = false;

  updatedProfile = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  @Output('profileUpdated') updateProfileEvent = new EventEmitter();
  @Output('profileDeleted') deleteProfileEvent = new EventEmitter();

  constructor(
    private userProfilesService: UserProfilesService,
    // private toast: ToastrService,
    private fb: FormBuilder,
    private handler: ErrorHandlerService
  ) {}
  ngOnInit(): void {
    this.updatedProfile.get('title')?.setValue(this.profile.title);
    this.updatedProfile.get('description')?.setValue(this.profile.description);
  }

  updateProfile() {
    this.userProfilesService
      .updateUserProfile(this.profile.id, this.updatedProfile.value)
      .subscribe({
        next: (res) => {
          this.showUpdate = false;
          this.updateProfileEvent.emit(res);
        },
        error: (error) => {
          this.handler.handle(error);
        },
      });
  }

  deleteProfile() {
    this.userProfilesService.deleteUserProfile(this.profile.id).subscribe({
      next: (res) => {
        this.deleteProfileEvent.emit(this.profile);
      },
      error: (error) => {
        this.handler.handle(error);
      },
    });
  }
}
