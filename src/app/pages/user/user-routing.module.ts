import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { authGuard, orderGuard } from 'src/app/guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'products/:id',
    component: DetailProductComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuard],
  },
  {
    path: 'orders',
    component: OrderComponent,
    canActivate: [authGuard, orderGuard],
  },
  {
    path: 'orders/:id',
    component: OrderDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
