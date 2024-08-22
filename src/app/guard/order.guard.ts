import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OrderService } from '../services';

export const orderGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const orderService = inject(OrderService);
  if (orderService.getOrdersFromLocalStorage().size) {
    return true;
  } else {
    router.navigate(['cart']);
    return false;
  }
};
