import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetailReponse, OrderResponse, Product } from 'src/app/models';
import { OrderService, ProductService } from 'src/app/services';

@Component({
  selector: 'app-product-history',
  templateUrl: './product-history.component.html',
  styleUrls: ['./product-history.component.scss'],
})
export class ProductHistoryComponent implements OnInit {
  @Input() orderDetail!: OrderDetailReponse;
  @Input() order!:OrderResponse;
  product!: Product;
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.product = this.orderDetail.product;  
    // this.getOrderById(this.orderDetail.order_id);
  }
  getProductById(id: number) {
    this.productService.getProductById(id).subscribe({
      next: ({ data }: any) => {
        this.product = data;
      },
    });
  }
  getTotalProduct() {
    return this.product.price * this.orderDetail.number_of_products;
  }
  getOrderById(id: number) {
    return this.orderService.getOrderById(id).subscribe({
      next: ({ data }: any) => (this.order = data),
    });
  }
  navigateProductDetail() {
    this.router.navigate([`products/${this.product.id}`]);
  }
}
