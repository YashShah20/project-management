import { NgModule, AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/material.module';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { UserDashboardComponent } from '../../pages/user-dashboard/user-dashboard.component';
import { RouterModule } from '@angular/router';
import { UserLayoutRoutes } from './user-layout.routing';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';

import { MatTableModule } from '@angular/material/table';
import { StatusPipe } from 'src/app/pipes/status.pipe';
import { ProjectDetailsComponent } from '../../pages/project-details/project-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectListComponent } from 'src/app/pages/project-list/project-list.component';
import { ProjectTabsComponent } from '../../pages/project-tabs/project-tabs.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserProfileComponent,
    StatusPipe,
    ProjectDetailsComponent,
    ProjectListComponent,
    ProjectTabsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(UserLayoutRoutes),
    MaterialModule,
    MatPaginatorModule,
    // MatTableDataSource,
    MatTableModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [UserService, ProjectService],
})
export class UserLayoutModule {}
