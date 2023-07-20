import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { UserService } from './services/user.service';
import { ComponentsModule } from "./components/components.module";

@NgModule({
    declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, UserLayoutComponent],
    providers: [
        UserService,
        CookieService,
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: TokenInterceptor,
        },
    ],
    bootstrap: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, ComponentsModule]
})
export class AppModule {}
