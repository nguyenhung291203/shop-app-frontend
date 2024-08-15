import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryItemComponent } from './order-history-item.component';

describe('OrderHistoryItemComponent', () => {
  let component: OrderHistoryItemComponent;
  let fixture: ComponentFixture<OrderHistoryItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderHistoryItemComponent]
    });
    fixture = TestBed.createComponent(OrderHistoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
