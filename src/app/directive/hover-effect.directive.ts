import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHoverEffect]'
})
export class HoverEffectDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.classList.add('hover-class');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.classList.remove('hover-class');
  }
}