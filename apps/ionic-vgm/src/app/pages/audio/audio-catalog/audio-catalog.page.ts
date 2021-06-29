import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopicCategory } from '@vgm/api-interfaces';
import { DataFetchService, DataFetchRootType } from '@vgm/xplat/core';
import { TopMenuItem } from '@vgm/xplat/ionic/features';
import { AvatarService } from 'libs/xplat/core/src/lib/services/avatar.service';

@Component({
  selector: 'vgm-audio-catalog',
  templateUrl: './audio-catalog.page.html',
  styleUrls: ['./audio-catalog.page.scss'],
})
export class AudioCatalogPage implements OnInit {
  public topicCategory: TopicCategory | null = null;
  public menuList: TopMenuItem[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataFetchService: DataFetchService,
    private avatarService: AvatarService
  ) {}

  async ngOnInit() {
    const { topicUrl } = this.activatedRoute.snapshot.params;
    if (topicUrl) {
      const topicData = await this.dataFetchService.fetchTopic(topicUrl);
      if (topicData.list) {
        topicData.list = topicData.list.map((item) => {
          return {
            ...item,
            href: this.getItemHref(item),
            avatar: this.avatarService.getAvatarByUrl(item.url),
          };
        });
      }
      this.topicCategory = topicData;
    } else {
      console.warn(`could not fetch data as topicUrl is undefined`);
    }
  }

  private getItemHref(item: any) {
    return [
      '/muc-luc',
      'audio',
      item.isLeaf ? 'playlist' : 'catalog',
      item.url,
    ];
  }
}
