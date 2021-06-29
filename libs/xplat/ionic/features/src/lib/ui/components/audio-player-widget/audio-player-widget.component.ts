import { Component } from '@angular/core';

import { BaseComponent } from '@vgm/xplat/core';

@Component({
  selector: 'vgm-audio-player-widget',
  templateUrl: 'audio-player-widget.component.html',
  styleUrls: ['./audio-player-widget.component.scss'],
})
export class AudioPlayerWidgetComponent extends BaseComponent {
  constructor() {
    super();
  }
}
