import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {
  HomeComponent,
  OrderComponent,
  OrderConfirmComponent,
  LoginComponent,
  DetailProductComponent,
  RegisterComponent,
} from './pages';
import { HeaderComponent,FooterComponent } from './layouts';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LoadingComponent,ProductComponent,PaginationComponent } from './components';
import { DiscountPipe } from './pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    OrderComponent,
    OrderConfirmComponent,
    LoginComponent,
    RegisterComponent,
    DetailProductComponent,
    LoadingComponent,
    DiscountPipe,
    ProductComponent,
    PaginationComponent,
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
})
export class AppModule {}
