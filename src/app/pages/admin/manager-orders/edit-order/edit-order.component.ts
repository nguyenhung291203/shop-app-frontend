import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderResponse } from 'src/app/models';
import { AlertService, LoadingService, OrderService } from 'src/app/services';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
})
export class EditOrderComponent {
  @Input() order!: OrderResponse;
  @Input() isShowDialogEditOrder: boolean = true;
  @Output() isShowDialogEditOrderChange = new EventEmitter<boolean>();
  status: Map<string, string> = new Map<string, string>([
    ['ALL', 'Tất cả'],
    ['PENDING', 'Đang chờ xử lý'],
    ['PROCESSING', 'Đang xử lý'],
    ['SHIPPED', 'Đã giao hàng'],
    ['DELIVERED', 'Đã nhận hàng'],
    ['CANCELLED', 'Đã hủy'],
  ]);
  constructor(
    private orderService: OrderService,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}
}
