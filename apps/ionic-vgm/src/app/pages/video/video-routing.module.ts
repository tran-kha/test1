import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideMenuComponent } from '@vgm/xplat/ionic/features';

import { VideoPage } from './video.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/muc-luc/video/catalog/home.video',
    pathMatch: 'full',
  },
  {
    path: '',
    component: VideoPage,
    children: [
      {
        path: 'catalog/:topicUrl',
        loadChildren: () =>
          import('./video-catalog/video-catalog.module').then(
            (m) => m.VideoCatalogPageModule
          ),
      },
      {
        path: 'player/:itemUrl',
        loadChildren: () =>
          import('./video-player/video-player.module').then(
            (m) => m.VideoPlayerPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoPageRoutingModule {}
