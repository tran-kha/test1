import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopicCategory } from '@vgm/api-interfaces';
import { DataFetchService } from '@vgm/xplat/core';
import { TopMenuItem } from '@vgm/xplat/ionic/features';
import { AvatarService } from 'libs/xplat/core/src/lib/services/avatar.service';

@Component({
  selector: 'vgm-audio-playlist',
  templateUrl: './audio-playlist.page.html',
  styleUrls: ['./audio-playlist.page.scss'],
})
export class AudioPlaylistPage implements OnInit {
  public topicCategory: TopicCategory | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataFetchService: DataFetchService,
    private avatarService: AvatarService
  ) {}

  async ngOnInit() {
    const { topicUrl } = this.activatedRoute.snapshot.params;
    if (topicUrl) {
      const topicData = await this.dataFetchService.fetchItemList(topicUrl);
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
      (this.topicCategory as any).avatar = this.avatarService.getAvatarByUrl(
        topicUrl
      );
      console.log(this.topicCategory);
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
