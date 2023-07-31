import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminAuthGuard } from 'src/app/guards/admin-auth.guard';
import { ForgotPasswordComponent } from 'src/app/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'src/app/pages/reset-password/reset-password.component';
import { SignInComponent } from 'src/app/pages/sign-in/sign-in.component';

export const AuthLayoutRoutes: Routes = [
  // {path: '', redirectTo: 'admin',pathMatch: 'full', canActivateChild: [adminAuthGuard]},
  { path: 'sign-in', component: SignInComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
];
