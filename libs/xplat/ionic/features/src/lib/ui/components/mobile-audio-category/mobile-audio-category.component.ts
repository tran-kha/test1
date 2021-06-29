import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ItemBase } from '@vgm/api-interfaces';

import { BaseComponent } from '@vgm/xplat/core';

@Component({
  selector: 'vgm-mobile-audio-category',
  templateUrl: 'mobile-audio-category.component.html',
  styleUrls: ['./mobile-audio-category.component.scss'],
})
export class MobileAudioCategoryComponent extends BaseComponent {
  @Input() name: string;
  @Input() childCount: string;
  @Input() href: string;
  @Input() avatar: string;

  constructor() {
    super();
  }
}
