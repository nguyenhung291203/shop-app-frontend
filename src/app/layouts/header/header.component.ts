import { Component, OnInit,HostListener } from '@angular/core';
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
  handleChangeIsOpenMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }
  handleClickOutside() {
    console.log('check');

    this.isOpenMenu = false;
  }
  handleChangeIsOpenBars() {
    this.isOpenBars = !this.isOpenBars;
  }
  getUserResponseFromLocalStorage() {
    this.user = this.tokenService.getUserResponseFromLocalStorage();
  }
  logout() {
    this.tokenService.removeUserResponse();
    this.user = null;
    this.router.navigate(['login']);
  }
  isMenuOpen = false;
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }


  @HostListener('document:click', ['$event'])
  clickOut(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('#user-menu-button') && !target.closest('[data-dropdown-toggle="user-dropdown"]')) {
      this.isMenuOpen = false;
    }
  }

}
