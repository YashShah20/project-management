import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [FooterComponent, NavbarComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [FooterComponent, NavbarComponent, HeaderComponent]
})
export class ComponentsModule { }
