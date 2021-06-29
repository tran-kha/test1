import { Component, Input } from '@angular/core';

import { BaseComponent } from '@vgm/xplat/core';

@Component({
  selector: 'vgm-thumb-card',
  templateUrl: 'thumb-card.component.html',
  styleUrls: ['./thumb-card.component.scss'],
})
export class ThumbCardComponent extends BaseComponent {
  @Input() title: string = 'Title video';
  @Input() subtitle: string = '45:05';
  @Input() href: string = '#';
  @Input() img: string;
  constructor() {
    super();
  }
}
