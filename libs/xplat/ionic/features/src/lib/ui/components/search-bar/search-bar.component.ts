import { Component } from '@angular/core';

import { BaseComponent } from '@vgm/xplat/core';

@Component({
  selector: 'vgm-search-bar',
  templateUrl: 'search-bar.component.html',
})
export class SearchBarComponent extends BaseComponent {
  constructor() {
    super();
  }
}
