import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from 'src/app/pages/sign-in/sign-in.component';

export const AuthLayoutRoutes: Routes = [
  {path: 'sign-in', component: SignInComponent }
];
