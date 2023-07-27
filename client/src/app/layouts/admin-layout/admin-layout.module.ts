import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminDashboardComponent } from '../../pages/admin-dashboard/admin-dashboard.component';
import { RouterModule } from '@angular/router';
import { AuthLayoutModule } from '../auth-layout/auth-layout.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { CreateUserComponent } from '../../pages/create-user/create-user.component';
import { AllUsersComponent } from 'src/app/pages/all-users/all-users.component';
import { AllProjectsComponent } from '../../pages/all-projects/all-projects.component';
import { UserProfilesComponent } from '../../pages/user-profiles/user-profiles.component';
import { UserProfilesService } from 'src/app/services/user-profiles.service';
import { UserProfileDetailsComponent } from '../../pages/user-profile-details/user-profile-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUserProfileComponent } from '../../pages/add-user-profile/add-user-profile.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    CreateUserComponent,
    AllUsersComponent,
    AllProjectsComponent,
    UserProfilesComponent,
    UserProfileDetailsComponent,
    AddUserProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(AdminLayoutRoutes),

    ComponentsModule,
    ReactiveFormsModule,
  ],
  providers: [UserProfilesService],
})
export class AdminLayoutModule {}
