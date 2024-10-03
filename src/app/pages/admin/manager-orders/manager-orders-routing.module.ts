import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManagerOrdersComponent } from './manager-orders.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: ManagerOrdersComponent }]),
  ],
  exports: [RouterModule],
})
export class ManagerOrdersRoutingModule {}
