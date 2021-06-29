import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum PlayingType {
  VIDEO,
  AUDIO,
}

export interface PlayState {
  isPlaying: boolean;
  playingType: PlayingType;
  playingUrl?: string;
  playingTitle?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  public isPlaying: boolean = false;
  public playingType: PlayingType = null;
  public playingUrl: string = null;
  public playingTitle: string = null;
  public playState: PlayState | null;

  public playState$: BehaviorSubject<Partial<PlayState> | null> = new BehaviorSubject<Partial<PlayState> | null>(
    null
  );

  constructor() {
    this.playState$.subscribe((newPlayState: PlayState) => {
      this.playState = { ...this.playState, ...newPlayState };
    });
  }

  playVideo(url: string, title: string) {
    this.playState$.next({
      isPlaying: true,
      playingType: PlayingType.VIDEO,
      playingUrl: url,
      playingTitle: title,
    });
  }

  playAudio(url: string, title: string) {
    this.playState$.next({
      isPlaying: true,
      playingType: PlayingType.AUDIO,
      playingUrl: url,
      playingTitle: title,
    });
  }

  pause() {
    this.playState$.next({ isPlaying: false });
  }
}
