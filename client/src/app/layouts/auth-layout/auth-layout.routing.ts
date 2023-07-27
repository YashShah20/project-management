import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminAuthGuard } from 'src/app/guards/admin-auth.guard';
import { SignInComponent } from 'src/app/pages/sign-in/sign-in.component';

export const AuthLayoutRoutes: Routes = [
  // {path: '', redirectTo: 'admin',pathMatch: 'full', canActivateChild: [adminAuthGuard]},
  {path: 'sign-in', component: SignInComponent },
  {path: '', redirectTo: 'sign-in', pathMatch: 'full'}
];
