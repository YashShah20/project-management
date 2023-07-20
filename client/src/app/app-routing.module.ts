import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

import { userAuthGuard } from './guards/user-auth.guard';
import { adminAuthGuard } from './guards/admin-auth.guard';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';

const routes: Routes = [
  // { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full', canActivate: [adminAuthGuard] },
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [userAuthGuard] },
  { path: 'admin', component: AdminLayoutComponent, canActivate: [adminAuthGuard], children: [
    { path: '', loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule) }
  ]},
  { path: 'user', component: UserLayoutComponent, canActivate: [userAuthGuard], children: [
    { path: '', loadChildren: () => import('./layouts/user-layout/user-layout.module').then(x => x.UserLayoutModule) }
  ]},
  { path: '', component: AuthLayoutComponent, children: [
    { path: '', loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(x => x.AuthLayoutModule) }
  ]},
  // { path: '**', redirectTo: 'admin-dashboard', canActivate: [adminAuthGuard] },
  // { path: '**', redirectTo: 'dashboard', canActivate: [userAuthGuard] },
  // { path: 'sign-up', component:  SignUpComponent},
  // { path: '', redirectTo: "sign-in", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
