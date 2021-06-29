import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ItemBase } from '@vgm/api-interfaces';

import { BaseComponent } from '@vgm/xplat/core';

@Component({
  selector: 'vgm-mobile-video-category',
  templateUrl: 'mobile-video-category.component.html',
  styleUrls: ['./mobile-video-category.component.scss'],
})
export class MobileVideoCategoryComponent
  extends BaseComponent
  implements OnChanges {
  @Input() name: string;
  @Input() itemList: ItemBase[] = [];

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('itemList', this.itemList);
  }

  ngOnInit(): void {}

  getItemThumbnail(hash: string) {
    return 'https://stream.vgm.tv/VGMV/01_BaiGiang/CacDienGia/MSNHB_DeHiepMotTrongPhucVu/preview/01.jpg';
  }
}
