import { Pipe, PipeTransform } from '@angular/core';
import { TokenService } from '../services';

@Pipe({
  name: 'cartItemCount',
})
export class CartItemCountPipe implements PipeTransform {
  constructor(private tokenService: TokenService) {}
  transform(value: number): string | null {
    if (!this.tokenService.getToken()) return null;
    if (value > 99) {
      return '99+';
    }
    return value.toString();
  }
}
