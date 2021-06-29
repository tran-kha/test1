import { Component, Input } from '@angular/core';

import { BaseComponent } from '@vgm/xplat/core';

export interface TopMenuItem {
  key: string;
  value: string;
  href: string;
}

@Component({
  selector: 'vgm-top-menu',
  templateUrl: 'top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent extends BaseComponent {
  @Input() home: 'video' | 'audio' = 'video';
  @Input() menuList: TopMenuItem[] = [];

  constructor() {
    super();
  }
}
