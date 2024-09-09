import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appToggleModel]'
})
export class ToggleModelDirective {

  @Input('appToggleModal') targetModalId!: string;

  constructor(private el: ElementRef) {}

  @HostListener('click') onClick() {
    const modal = document.getElementById(this.targetModalId);
    if (modal) {
      if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
      } else {
        modal.classList.add('hidden');
      }
    }
  }

}
