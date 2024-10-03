import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerOrdersComponent } from './manager-orders.component';
import { ManagerOrdersRoutingModule } from './manager-orders-routing.module';
import { PipeModule } from '../../../pipe/pipe.module';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditOrderComponent } from './edit-order/edit-order.component';

@NgModule({
  declarations: [ManagerOrdersComponent, EditOrderComponent],
  imports: [
    CommonModule,
    ManagerOrdersRoutingModule,
    PipeModule,
    DatePipe,
    FormsModule,
  ],
  exports: [ManagerOrdersComponent],
})
export class ManagerOrdersModule {}
