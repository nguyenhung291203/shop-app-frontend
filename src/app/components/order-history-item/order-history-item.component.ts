import { Component, Input, OnInit } from '@angular/core';
import { OrderResponse } from 'src/app/models';

@Component({
  selector: 'app-order-history-item',
  templateUrl: './order-history-item.component.html',
  styleUrls: ['./order-history-item.component.scss'],
})
export class OrderHistoryItemComponent implements OnInit {
  @Input() order!: OrderResponse;
  constructor() {}
  ngOnInit(): void {}
}
