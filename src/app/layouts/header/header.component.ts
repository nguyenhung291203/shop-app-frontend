import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Renderer2,
} from '@angular/core';
import { UserResponse } from 'src/app/models';
import { CartService, TokenService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cart!: Map<number, number>;
  isOpenMenu: boolean = false;
  isOpenBars: boolean = false;
  user!: UserResponse | null;
  logedIn$ = this.tokenService.loggedIn$;
  height!: number;
  constructor(
    private cartService: CartService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.cart = this.cartService.getCart();
  }

  ngOnInit(): void {
    this.getUserResponseFromLocalStorage();
  }

  getUserResponseFromLocalStorage() {
    this.user = this.tokenService.getUserResponseFromLocalStorage();
  }
  logout() {
    this.tokenService.removeUserResponse();
    this.user = null;
    this.tokenService.setLoggedIn$(false);
    this.router.navigate(['login']);
  }
}