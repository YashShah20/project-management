import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailsComponent } from 'src/app/pages/project-details/project-details.component';
import { ProjectListComponent } from 'src/app/pages/project-list/project-list.component';
import { UserDashboardComponent } from 'src/app/pages/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';

export const UserLayoutRoutes: Routes = [
    {path: 'dashboard', component: UserDashboardComponent},
    {path: 'user-profile', component: UserProfileComponent},
    {path: "user-projects", component: ProjectListComponent},
    {path: "project-detail/:project_id", component: ProjectDetailsComponent},
    {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
];
