import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quantityFormatter',
})
export class QuantityFormatterPipe implements PipeTransform {
  transform(quantity: number): string {
    if (quantity < 10000) {
      return quantity.toString();
    } else if (quantity >= 10000 && quantity < 1000000) {
      return (quantity / 1000).toFixed(1) + 'K';
    } else {
      return (quantity / 1000000).toFixed(1) + 'M';
    }
  }
}
