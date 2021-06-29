import { Component } from '@angular/core';

import { BaseComponent } from '@vgm/xplat/core';

@Component({
  selector: 'vgm-mobile-page-header',
  templateUrl: 'mobile-page-header.component.html',
  styleUrls: ['./mobile-page-header.component.scss'],
})
export class MobilePageHeaderComponent extends BaseComponent {
  constructor() {
    super();
  }
}
