import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services';

export const adminGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (tokenService.getToken()) {
    return tokenService.getUserResponseFromLocalStorage().role_id == 2;
  } else {
    router.navigate(['login']);
    return false;
  }
};
