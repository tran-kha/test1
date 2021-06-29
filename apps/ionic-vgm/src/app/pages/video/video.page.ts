import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataFetchService } from '@vgm/xplat/core';

import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'vgm-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {
  public videoList: any[] = [];

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public dataFetchService: DataFetchService,
    private _electronService: ElectronService
  ) {}

  public playPingPong() {
    if (this._electronService.isElectronApp) {
      let pong: string = this._electronService.ipcRenderer.sendSync(
        'ELECTRON_BRIDGE_HOST',
        'ping'
      );
      console.log(pong);
    }
  }

  async init() {
    // this.playPingPong();
    const videoList = await this.dataFetchService.fetchRoot('video');
    this.videoList = videoList.map((item) => ({
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
    if (this.videoList) {
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
