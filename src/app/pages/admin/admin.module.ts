import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { ChartModule } from 'primeng/chart';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuitemComponent } from './menu/menuitem/menuitem.component';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { ComponentsModule } from '../../components/components.module';
import { PaginatorModule } from 'primeng/paginator';
import { ManagerProductsComponent } from './manager-products/manager-products.component';

@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    MenuComponent,
    TopbarComponent,
    FooterComponent,
    DashboardComponent,
    MenuitemComponent,
    ManagerProductsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SidebarModule,
    TableModule,
    MenuModule,
    ChartModule,
    PipeModule,
    ComponentsModule,
    PaginatorModule,
  ],
  exports: [AdminComponent],
})
export class AdminModule {}
