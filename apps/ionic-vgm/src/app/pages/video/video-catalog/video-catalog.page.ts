import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataFetchRootType, DataFetchService } from '@vgm/xplat/core';
import { TopicCategory } from '@vgm/api-interfaces';
import { TopMenuItem } from '@vgm/xplat/ionic/features';

@Component({
  selector: 'vgm-video-catalog',
  templateUrl: './video-catalog.page.html',
  styleUrls: ['./video-catalog.page.scss'],
})
export class VideoCatalogPage implements OnInit {
  public topicCategory: TopicCategory | null = null;
  public menuList: TopMenuItem[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataFetchService: DataFetchService
  ) {}

  private async fetchMobileMenu(root: DataFetchRootType) {
    const menuList = await this.dataFetchService.fetchRoot(root);
    this.menuList = menuList.map((item) => ({
      key: item.id,
      value: item.name.replace(/[0-9]+\-/g, ''),
      href: item.url,
    }));
  }

  async ngOnInit() {
    const { topicUrl } = this.activatedRoute.snapshot.params;
    // this.fetchMobileMenu('video'); // TODO detect the root video or audio
    if (topicUrl) {
      // console.log(`fetching ${topicUrl}....`);
      const topicData = await this.dataFetchService.fetchTopic(topicUrl);
      if (topicData.list) {
        // Fill img by url
        topicData.list = topicData.list.map((list) => {
          list.items = list.items.map((item) => ({
            ...item,
            thumb: this.getItemThumbnail(item),
            href: this.getItemHref(item),
          }));
          return list;
        });
      }
      this.topicCategory = topicData;
      // console.log('topicData', this.topicCategory);
    } else {
      console.warn(`could not fetch data as topicUrl is undefined`);
    }
  }

  private getItemThumbnail(item: any) {
    return this.dataFetchService.getThumbnailUrl(item); // 'https://stream.vgm.tv/VGMV/01_BaiGiang/CacDienGia/MSNHB_DeHiepMotTrongPhucVu/preview/01.jpg';
  }

  private getItemHref(item: any) {
    return ['/muc-luc', 'video', 'player', item.url];
  }
}
