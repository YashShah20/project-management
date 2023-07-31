import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutRoutes } from './auth-layout.routing';
import { AuthLayoutComponent } from './auth-layout.component';
import { SignInComponent } from 'src/app/pages/sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    // AuthLayoutComponent,
    SignInComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(AuthLayoutRoutes),
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AuthLayoutModule {}
