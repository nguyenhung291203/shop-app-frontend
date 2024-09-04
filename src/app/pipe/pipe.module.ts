import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemCountPipe } from './cart-item-count.pipe';
import { DateFormatPipe } from './date-format.pipe';
import { DiscountPipe } from './discount.pipe';
import { RoundPipe } from './round.pipe';
import { OrderStatusPipe } from './order-status.pipe';
import { PaymentPipe } from './payment.pipe';
import { QuantityFormatterPipe } from './quantity-formatter.pipe';

@NgModule({
  declarations: [
    CartItemCountPipe,
    DateFormatPipe,
    DiscountPipe,
    RoundPipe,
    OrderStatusPipe,
    PaymentPipe,
    QuantityFormatterPipe,
  ],
  imports: [CommonModule],
  exports: [
    CartItemCountPipe,
    DateFormatPipe,
    DiscountPipe,
    RoundPipe,
    OrderStatusPipe,
    PaymentPipe,
    QuantityFormatterPipe,
  ],
})
export class PipeModule {}
