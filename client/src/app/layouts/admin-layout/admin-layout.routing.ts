import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminAuthGuard } from 'src/app/guards/admin-auth.guard';
import { AdminDashboardComponent } from 'src/app/pages/admin-dashboard/admin-dashboard.component';
import { AllProjectsComponent } from 'src/app/pages/all-projects/all-projects.component';
import { AllUsersComponent } from 'src/app/pages/all-users/all-users.component';
import { UserDetailsComponent } from 'src/app/pages/user-details/user-details.component';
import { UserProfilesComponent } from 'src/app/pages/user-profiles/user-profiles.component';
import { UserRoleListComponent } from 'src/app/pages/user-role-list/user-role-list.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'projects', component: AllProjectsComponent },
  { path: 'users', component: AllUsersComponent },
  { path: 'users/:user_id', component: UserDetailsComponent },
  { path: 'user-profiles', component: UserProfilesComponent },
  { path: 'user-roles', component: UserRoleListComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
  // {path: }
];
