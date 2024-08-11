import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() totalPages: number = 1;
  @Input() page: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  handleChangePage(value: number) {
    this.pageChange.emit(this.page + value);
  }
}
