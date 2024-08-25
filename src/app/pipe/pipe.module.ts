import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemCountPipe } from './cart-item-count.pipe';
import { DateFormatPipe } from './date-format.pipe';
import { DiscountPipe } from './discount.pipe';
import { RoundPipe } from './round.pipe';

@NgModule({
  declarations: [CartItemCountPipe, DateFormatPipe, DiscountPipe, RoundPipe],
  imports: [CommonModule],
  exports: [CartItemCountPipe, DateFormatPipe, DiscountPipe, RoundPipe],
})
export class PipeModule {}
