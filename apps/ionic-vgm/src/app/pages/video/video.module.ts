import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoPageRoutingModule } from './video-routing.module';

import { VideoPage } from './video.page';
import { SharedModule } from '../../features/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    VideoPageRoutingModule,
  ],
  declarations: [VideoPage],
})
export class VideoPageModule {}
