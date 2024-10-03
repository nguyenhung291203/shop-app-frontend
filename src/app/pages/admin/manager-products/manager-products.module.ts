import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerProductsComponent } from './manager-products.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { InsertProductComponent } from './insert-product/insert-product.component';
import { DialogModule } from 'primeng/dialog';
import { ManagerProductsRoutingModule } from './manager-products-routing.module';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { EditProductComponent } from './edit-product/edit-product.component';

@NgModule({
  declarations: [ManagerProductsComponent, InsertProductComponent, ProductDetailComponent, EditProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    PipeModule,
    DialogModule,
    ManagerProductsRoutingModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
  ],
  exports: [ManagerProductsComponent],
})
export class ManagerProductsModule {}
