import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'payment',
})
export class PaymentPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'transfer':
        return 'Thanh toán online';
      case 'cash':
        return 'Thanh toán khi nhận hàng';
      default:
        return 'không xác định';
    }
  }
}
