import { Component, Input, OnInit } from '@angular/core';

import { BaseComponent } from '@vgm/xplat/core';
import { ItemBase } from '@vgm/api-interfaces';

@Component({
  selector: 'vgm-video-category',
  templateUrl: 'video-category.component.html',
})
export class VideoCategoryComponent extends BaseComponent implements OnInit {
  @Input() name: string;
  @Input() itemList: ItemBase[] = [];

  constructor() {
    super();
  }

  ngOnInit(): void {
    console.log('video-category/itemList', this.itemList);
  }

  getItemThumbnail(hash: string) {
    return 'https://stream.vgm.tv/VGMV/01_BaiGiang/CacDienGia/MSNHB_DeHiepMotTrongPhucVu/preview/01.jpg';
  }
}
