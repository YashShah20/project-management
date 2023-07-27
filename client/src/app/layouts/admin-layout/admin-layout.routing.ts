import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminAuthGuard } from 'src/app/guards/admin-auth.guard';
import { AdminDashboardComponent } from 'src/app/pages/admin-dashboard/admin-dashboard.component';
import { AllProjectsComponent } from 'src/app/pages/all-projects/all-projects.component';
import { AllUsersComponent } from 'src/app/pages/all-users/all-users.component';

export const AdminLayoutRoutes: Routes = [
    {path: 'dashboard', component: AdminDashboardComponent},
    {path: 'projects', component: AllProjectsComponent},
    {path: 'users', component: AllUsersComponent},
    {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
    // {path: }
];

