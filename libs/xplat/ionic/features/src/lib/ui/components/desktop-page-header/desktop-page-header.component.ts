import { Component } from '@angular/core';

import { BaseComponent } from '@vgm/xplat/core';

@Component({
  selector: 'vgm-desktop-page-header',
  templateUrl: 'desktop-page-header.component.html',
  styleUrls: ['./desktop-page-header.component.scss'],
})
export class DesktopPageHeaderComponent extends BaseComponent {
  constructor() {
    super();
  }
}
