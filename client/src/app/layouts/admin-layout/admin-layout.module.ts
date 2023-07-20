import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminDashboardComponent } from '../../pages/admin-dashboard/admin-dashboard.component';
import { RouterModule } from '@angular/router';
import { AuthLayoutModule } from '../auth-layout/auth-layout.module';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    AdminDashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(AdminLayoutRoutes),

    ComponentsModule
  ]
})
export class AdminLayoutModule { }
