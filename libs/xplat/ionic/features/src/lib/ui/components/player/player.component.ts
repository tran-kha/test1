import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import videojs from 'video.js';
import '@videojs/http-streaming';
import 'videojs-hls-quality-selector';

export interface PlayerOptions {
  fluid: boolean;
  aspectRation: string;
  autoplay: boolean;
  sources: {
    src: string;
    type: string;
  };
}

@Component({
  selector: 'vgm-player',
  templateUrl: 'player.component.html',
  styleUrls: ['./player.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
// extends BaseComponent
export class PlayerComponent implements OnInit, OnDestroy {
  @ViewChild('target', { static: true }) target: ElementRef;
  @Input()
  set options(options: PlayerOptions) {
    console.log('video option update', options);
    this._options = options;
    this.play();
  }
  get options(): PlayerOptions {
    return this._options;
  }

  private _options: PlayerOptions;

  player: videojs.Player;

  constructor(private elementRef: ElementRef) {
    // super();
  }

  play(): void {
    if (this.options && this.player) {
      // this.player = videojs(
      //   this.target.nativeElement,
      //   this.options,
      //   function onPlayerReady() {
      //     console.log('onPlayerReady', this);
      //     this.target.nativeElement.play();
      //   }
      // );
      console.log(`Set player source`, this.options.sources);
      this.player.src(this.options.sources);
      this.player.play();
    }
  }

  ngOnInit() {
    this.player = videojs(this.target.nativeElement, {
      html5: {
        vhs: {
          withCredentials: false,
        },
      },
    });
    this.player.hlsQualitySelector();
    console.log('init player', this.player);
    this.player.ready(function () {
      console.log('player ready', this._options);
      // console.log('player muted state', this.player.muted());
      // this.player.muted(true);
      this.player.play();
    });
  }

  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }
}
