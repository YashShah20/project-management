import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminAuthGuard } from 'src/app/guards/admin-auth.guard';
import { AdminDashboardComponent } from 'src/app/pages/admin-dashboard/admin-dashboard.component';
import { ProjectListComponent } from 'src/app/pages/project-list/project-list.component';

export const AdminLayoutRoutes: Routes = [
    {path: 'dashboard', component: AdminDashboardComponent},
    {path: 'projects', component: ProjectListComponent},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    // {path: }
];

