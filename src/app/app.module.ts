import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {
  HomeComponent,
  OrderComponent,
  LoginComponent,
  DetailProductComponent,
  RegisterComponent,
  OrderDetailComponent,
  OrderHistoryComponent,
  CartComponent,
} from './pages';
import { HeaderComponent, FooterComponent } from './layouts';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import {
  LoadingComponent,
  ProductComponent,
  PaginationComponent,
  OrderHistoryItemComponent,
  ProductHistoryComponent,
} from './components';
import { DiscountPipe, RoundPipe } from './pipe';
import { DateFormatPipe } from './pipe/date-format.pipe';
import { ClickOutsideDirective } from './directive';
import { HoverEffectDirective } from './directive/hover-effect.directive';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { CalendarModule } from 'primeng/calendar';

import { CartItemCountPipe } from './pipe/cart-item-count.pipe';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MenuComponent } from './pages/admin/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    OrderComponent,
    OrderDetailComponent,
    LoginComponent,
    RegisterComponent,
    DetailProductComponent,
    LoadingComponent,
    DiscountPipe,
    ProductComponent,
    PaginationComponent,
    RoundPipe,
    OrderHistoryComponent,
    OrderHistoryItemComponent,
    ProductHistoryComponent,
    DateFormatPipe,
    ClickOutsideDirective,
    HoverEffectDirective,
    UserProfileComponent,

    CartItemCountPipe,
    NotFoundComponent,
    AdminComponent,
    CartComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CalendarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  exports: [ClickOutsideDirective],
})
export class AppModule {}
