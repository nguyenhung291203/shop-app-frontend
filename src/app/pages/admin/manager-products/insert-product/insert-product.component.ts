import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { concatMap } from 'rxjs';
import { Category, ProductRequest } from 'src/app/models';
import {
  AlertService,
  CategoryService,
  LoadingService,
  ProductService,
} from 'src/app/services';

@Component({
  selector: 'app-insert-product',
  templateUrl: './insert-product.component.html',
  styleUrls: ['./insert-product.component.scss'],
})
export class InsertProductComponent implements OnInit {
  @Input() visibleInsertProduct: boolean = false;
  @Output() visibleInsertProductChange = new EventEmitter<boolean>();
  uploadForm: FormGroup;
  selectedFiles: File[] = [];
  urls: any[] = [];
  productRequest: ProductRequest = {
    name: 'Sản phẩm mới',
    category_id: 2,
    price: 99,
    quantity: 10,
    description: '',
  };

  categories: Category[] = [];
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private productService: ProductService
  ) {
    this.uploadForm = this.fb.group({});
  }
  ngOnInit(): void {
    this.getAllCategories();
  }
  showDialogInsertProduct() {
    this.visibleInsertProductChange.emit(true);
  }
  closeDialogInsertProduct() {
    this.visibleInsertProductChange.emit(false);
  }
  onFileSelected(event: any): void {
    if (event.target.files) {
      if (this.selectedFiles.length + event.target.files.length > 5) {
        this.alertService.error('Bạn chỉ có thể chọn tối đa 5 ảnh.');
        return;
      }
      const files = Array.from(event.target.files); // Chuyển đổi FileList thành Array
      files.forEach((file: any) => {
        if (this.selectedFiles.filter((f) => f.name === file.name).length > 0) {
          this.alertService.error(`${file.name} đã tồn tại`);
          return;
        }
        this.selectedFiles.push(file);
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  onSubmit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (this.selectedFiles.length === 0) {
      this.alertService.error('Vui lòng chọn ít nhất một ảnh');
      return;
    }
    this.loadingService.show();
    this.productService
      .insertProduct(this.productRequest)
      .pipe(
        concatMap(({ data, message }: any) => {
          const productId = data.id;
          const formData = new FormData();

          this.selectedFiles.forEach((file) => {
            formData.append('files', file);
          });
          return this.productService.insertProductImage(productId, formData);
        })
      )
      .subscribe({
        next: () => {
          this.alertService.success('Thêm sản phẩm và ảnh thành công!');
        },
        error: ({ error }) => {
          this.alertService.error(error.message);
          this.loadingService.hide();
        },
        complete: () => {
          this.restData();
          this.visibleInsertProductChange.emit(false);
          this.loadingService.hide();
        },
      });
  }
  getAllCategories() {
    this.loadingService.show();
    this.categoryService.getAllCategories().subscribe({
      next: ({ data }) => {
        this.categories = data;
        this.loadingService.hide();
      },
      error: ({ error }) => {
        this.alertService.error(error.message);
        this.loadingService.hide();
      },
    });
  }
  removeImage(url: string): void {
    const index = this.urls.indexOf(url);
    this.urls = this.urls.filter((urlItem) => urlItem !== url);
    this.selectedFiles = this.selectedFiles.filter(
      (_, indexFile) => indexFile !== index
    );
  }
  restData(): void {
    this.productRequest = {
      name: 'Sản phẩm mới',
      category_id: 2,
      price: 99,
      quantity: 10,
      description: '',
    };
    this.selectedFiles = [];
    this.urls = [];
  }
}
