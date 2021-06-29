import { Component, Input } from '@angular/core';

import { BaseComponent } from '@vgm/xplat/core';

@Component({
  selector: 'vgm-audio-thumb-card',
  templateUrl: 'audio-thumb-card.component.html',
  styleUrls: ['./audio-thumb-card.component.scss'],
})
export class AudioThumbCardComponent extends BaseComponent {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() href: string;
  @Input() isHighlight: boolean = false;
  @Input() avatar: string = null;
  constructor() {
    super();
  }
}
