import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from 'src/app/pages/admin-dashboard/admin-dashboard.component';

export const AdminLayoutRoutes: Routes = [
    {path: 'admin-dashboard', component: AdminDashboardComponent}
];

