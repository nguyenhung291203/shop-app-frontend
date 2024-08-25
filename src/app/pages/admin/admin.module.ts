import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { ConfigComponent } from './config/config.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    MenuComponent,
    TopbarComponent,
    FooterComponent,
    ConfigComponent,
  ],
  imports: [CommonModule, RouterModule,FormsModule],
  exports: [AdminComponent],
})
export class AdminModule {}
