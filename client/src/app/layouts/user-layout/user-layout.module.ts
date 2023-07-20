import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardComponent } from '../../pages/user-dashboard/user-dashboard.component';
import { RouterModule } from '@angular/router';
import { UserLayoutRoutes } from './user-layout.routing';


@NgModule({
  declarations: [
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(UserLayoutRoutes),
    
  ]
})
export class UserLayoutModule { }
