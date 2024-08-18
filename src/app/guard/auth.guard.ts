import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (tokenService.getToken()) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
