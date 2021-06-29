import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { UIModule as UIWebModule } from '@vgm/xplat/web/features';
import {
  AudioPlayerWidgetComponent,
  AudioThumbCardComponent,
  DesktopPageHeaderComponent,
  HeaderComponent,
  MobileAudioCategoryComponent,
  MobilePageHeaderComponent,
  MobileVideoCategoryComponent,
  PlayerComponent,
  SearchBarComponent,
  SideMenuComponent,
  ThumbCardComponent,
  TopMenuComponent,
  VideoCategoryComponent,
} from './components';
import { AudioPlayListComponent } from './components/audio-play-list/audio-play-list.component';
import { ImgFallbackDirective } from './directives';

@NgModule({
  imports: [UIWebModule, IonicModule],
  declarations: [
    // Components
    HeaderComponent,
    SideMenuComponent,
    TopMenuComponent,
    SearchBarComponent,
    ThumbCardComponent,
    VideoCategoryComponent,
    DesktopPageHeaderComponent,
    MobilePageHeaderComponent,
    MobileVideoCategoryComponent,
    PlayerComponent,
    // Audio
    AudioThumbCardComponent,
    AudioPlayListComponent,
    MobileAudioCategoryComponent,
    AudioPlayerWidgetComponent,
    // Directives
    ImgFallbackDirective,
  ],
  exports: [
    // Component
    UIWebModule,
    IonicModule,
    HeaderComponent,
    SideMenuComponent,
    TopMenuComponent,
    SearchBarComponent,
    ThumbCardComponent,
    VideoCategoryComponent,
    DesktopPageHeaderComponent,
    MobilePageHeaderComponent,
    MobileVideoCategoryComponent,
    PlayerComponent,
    // Audio
    AudioThumbCardComponent,
    AudioPlayListComponent,
    MobileAudioCategoryComponent,
    AudioPlayerWidgetComponent,
    // Directives
    ImgFallbackDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UIModule {}
