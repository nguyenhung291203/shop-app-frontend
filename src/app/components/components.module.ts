import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';

import { PaginationComponent } from './pagination/pagination.component';
import { ProductComponent } from './product/product.component';
import { ProductHistoryComponent } from './product-history/product-history.component';
import { PipeModule } from '../pipe/pipe.module';
import { OrderHistoryItemComponent } from './order-history-item/order-history-item.component';

@NgModule({
  declarations: [
    LoadingComponent,
    PaginationComponent,
    ProductComponent,
    ProductHistoryComponent,
    OrderHistoryItemComponent
  ],
  imports: [CommonModule, PipeModule],
  exports: [
    LoadingComponent,
    PaginationComponent,
    ProductComponent,
    ProductHistoryComponent,
    OrderHistoryItemComponent
  ],
})
export class ComponentsModule {}
