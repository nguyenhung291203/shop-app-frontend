import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  DetailProductComponent,
  HomeComponent,
  LoginComponent,
  OrderComponent,
  OrderDetailComponent,
  RegisterComponent,
  OrderHistoryComponent,
} from './pages';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'products/:id',
    component: DetailProductComponent,
  },
  {
    path: 'orders',
    component: OrderComponent,
  },
  {
    path: 'orders/:id',
    component: OrderDetailComponent,
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
