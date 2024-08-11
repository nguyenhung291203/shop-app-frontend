import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
})
export class DiscountPipe implements PipeTransform {
  transform(value: number, discount: number): number {
    return Number((value * (1 - discount)).toFixed(2));
  }
}