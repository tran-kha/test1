import { Component, Input } from '@angular/core';

import { BaseComponent, Item, ItemList } from '@vgm/xplat/core';

@Component({
  selector: 'vgm-audio-play-list',
  templateUrl: 'audio-play-list.component.html',
  styleUrls: ['audio-play-list.component.scss'],
})
export class AudioPlayListComponent extends BaseComponent {
  @Input() public list: ItemList[] = [];
  @Input() public playingItem: Item = null;

  constructor() {
    super();
  }

  formatName(name: string) {
    return name.replace(/^([0-9]+)(_|-)?/g, '');
  }
}
