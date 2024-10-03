import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  @Input() product!: Product;

  @Input() visibleDetailProduct: boolean = false;
  @Output() visibleDetailProductChange = new EventEmitter<boolean>();
  urls: string[] = [];
  ngOnInit(): void {}

  showDialogDetailProduct(): void {
    this.visibleDetailProductChange.emit(true);
    this.urls = [this.product.thumbnail, ...this.product.images];
  }

  closeDialogDetailProduct(): void {
    this.visibleDetailProductChange.emit(false);
    
  }
}
