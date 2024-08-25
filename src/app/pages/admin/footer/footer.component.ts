import { Component } from '@angular/core';
import { LayoutService } from 'src/app/services';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private layoutService: LayoutService) {}
}
