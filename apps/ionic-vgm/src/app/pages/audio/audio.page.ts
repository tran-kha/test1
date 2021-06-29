import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataFetchService } from '@vgm/xplat/core';

@Component({
  selector: 'vgm-audio',
  templateUrl: './audio.page.html',
  styleUrls: ['./audio.page.scss'],
})
export class AudioPage implements OnInit {
  public audioList: any[] = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dataFetchService: DataFetchService
  ) {}

  async init() {
    // this.playPingPong();
    const audioList = await this.dataFetchService.fetchRoot('audio');
    this.audioList = audioList.map((item) => ({
      key: item.id,
      value: item.name.replace(/[0-9]+\-/g, ''),
      href: item.url,
    }));
  }

  async ngOnInit() {
    if (!this.dataFetchService.isInitialized) {
      await this.dataFetchService.init();
    }
    this.init()
      .then(() => {
        console.log(`App init state: ${this.dataFetchService.isInitialized}`);
        this.fallback();
      })
      .catch((err) => {
        console.warn(err);
        this.fallback();
      });
  }

  /**
   * Fallback to VGM Core initialization method if cache existing
   * @returns
   */
  async fallback() {
    if (this.audioList) {
      if (!this.dataFetchService.isInitialized) {
        await this.dataFetchService.init();
      }
      return;
    }
    if (!this.dataFetchService.isInitialized) {
      this.router.navigateByUrl(`/home?redirectTo=${this.router.url}`, {
        replaceUrl: true,
      });
    }
  }
}
