import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { UserComponent } from './user.component';
import { LayoutsModule } from '../../layouts/layouts.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    CartComponent,
    DetailProductComponent,
    HomeComponent,
    OrderComponent,
    OrderDetailComponent,
    OrderHistoryComponent,
    UserProfileComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    UserRoutingModule,
    FormsModule,
    PipeModule,
    LayoutsModule,
    // RouterModule,
  ],
  exports: [
    CartComponent,
    DetailProductComponent,
    HomeComponent,
    OrderComponent,
    OrderDetailComponent,
    OrderHistoryComponent,
    UserProfileComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
  ],
})
export class UserModule {}
