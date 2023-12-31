import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { UserProfilesService } from 'src/app/services/user-profiles.service';

@Component({
  selector: 'app-add-user-profile',
  templateUrl: './add-user-profile.component.html',
  styleUrls: ['./add-user-profile.component.scss'],
})
export class AddUserProfileComponent {
  @Output('profileAdded') addProfileEvent = new EventEmitter();

  userProfile = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  constructor(
    private userProfileService: UserProfilesService,
    // private toast: ToastrService,
    private fb: FormBuilder,
    private handler: ErrorHandlerService
  ) {}

  addProfile() {
    this.userProfileService.addUserProfile(this.userProfile.value).subscribe({
      next: (res) => {
        this.addProfileEvent.emit(res);
      },
      error: (error) => {
        this.handler.handle(error);
      },
    });
  }
}
