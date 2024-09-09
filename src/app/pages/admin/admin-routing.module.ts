import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagerProductsComponent } from './manager-products/manager-products.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'manager-products',
    loadChildren: () =>
      import('./manager-products/manager-products.module').then(
        (m) => m.ManagerProductsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
