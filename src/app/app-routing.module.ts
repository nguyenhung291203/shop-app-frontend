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
  UserProfileComponent,
  AdminComponent,
} from './pages';
import { adminGuard, authGuard } from './guard';

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
    canActivate: [authGuard],
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
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
