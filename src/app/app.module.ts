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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
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
