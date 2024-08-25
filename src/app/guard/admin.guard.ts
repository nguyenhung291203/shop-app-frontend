import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services';

export const adminGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (tokenService.getToken()) {
    if (tokenService.getUserResponseFromLocalStorage().role_id == 2)
      return true;
    else {
      router.navigate(['login']);
      return false;
    }
  } else {
    router.navigate(['login']);
    return false;
  }
};
