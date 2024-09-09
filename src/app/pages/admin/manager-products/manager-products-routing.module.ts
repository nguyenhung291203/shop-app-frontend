import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManagerProductsComponent } from './manager-products.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: ManagerProductsComponent }]),
  ],
  exports: [RouterModule],
})
export class ManagerProductsRoutingModule {}
