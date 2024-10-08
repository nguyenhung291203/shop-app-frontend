import { Component, ElementRef } from '@angular/core';
import { LayoutService } from 'src/app/services';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss','../admin.component.scss'],
})
export class SidebarComponent {
  constructor(public layoutService: LayoutService, public el: ElementRef) {}
}
