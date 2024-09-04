import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatus',
})
export class OrderStatusPipe implements PipeTransform {
  private statusMap: { [key: string]: string } = {
    ALL: 'Tất cả',
    PENDING: 'Đang chờ xử lý',
    PROCESSING: 'Đang xử lý',
    SHIPPED: 'Đã giao hàng',
    DELIVERED: 'Đã nhận hàng',
    CANCELLED: 'Đã hủy',
  };

  transform(value: string): string {
    return this.statusMap[value] || 'Trạng thái không xác định';
  }
}
