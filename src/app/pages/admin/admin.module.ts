import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { DialogModule } from 'primeng/dialog';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuitemComponent } from './menu/menuitem/menuitem.component';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { ComponentsModule } from '../../components/components.module';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ManagerOrdersComponent } from './manager-orders/manager-orders.component';

@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    MenuComponent,
    TopbarComponent,
    FooterComponent,
    DashboardComponent,
    MenuitemComponent,
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
    ButtonModule,
    DialogModule,
  ],
  exports: [AdminComponent],
})
export class AdminModule {}
