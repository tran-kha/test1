import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataFetchService } from '@vgm/xplat/core';
import Hls from 'hls.js';

@Component({
  selector: 'vgm-video-player',
  templateUrl: './video-player.page.html',
  styleUrls: ['./video-player.page.scss'],
})
export class VideoPlayerPage implements OnInit {
  @ViewChild('video') videoEle: ElementRef<HTMLVideoElement>;
  public playUrl: string =
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  // public type: string = 'application/x-mpegURL'
  public type: string = 'video/mp4';
  public itemListData: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataFetchService: DataFetchService
  ) {}

  async ngOnInit() {
    const { itemUrl } = this.activatedRoute.snapshot.params;
    const item = await this.dataFetchService.fetchSingleItem(itemUrl);

    this.playUrl = this.dataFetchService.getPlayUrl(item);
    this.type = 'application/x-mpegURL';

    const itemListUrl = itemUrl.match(/.*(?=\.)/).toString();
    const itemList = await this.dataFetchService.fetchItemList(itemListUrl);

    if (itemList.list) {
      // Fill img by url
      itemList.list = itemList.list.map((item) => {
        return {
          ...item,
          thumb: this.getItemThumbnail(item),
          href: this.getItemHref(item),
        };
      });
    }

    this.itemListData = itemList;

    // if (Hls.isSupported()) {
    //   const hls = new Hls();
    //   hls.loadSource(playUrl);
    //   hls.attachMedia(this.videoEle.nativeElement);
    //   hls.on(Hls.Events.MANIFEST_PARSED, () =>
    //     this.videoEle.nativeElement.play()
    //   );
    // }
  }

  private getItemThumbnail(item: any) {
    return this.dataFetchService.getThumbnailUrl(item); // 'https://stream.vgm.tv/VGMV/01_BaiGiang/CacDienGia/MSNHB_DeHiepMotTrongPhucVu/preview/01.jpg';
  }

  private getItemHref(item: any) {
    return ['/muc-luc', 'video', 'player', item.url];
  }
}
