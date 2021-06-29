import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideMenuComponent } from '@vgm/xplat/ionic/features';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/muc-luc/video/catalog/home.video',
    pathMatch: 'full',
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'video',
        loadChildren: () =>
          import('../video/video.module').then((m) => m.VideoPageModule),
      },
      {
        path: 'audio',
        loadChildren: () =>
          import('../audio/audio.module').then((m) => m.AudioPageModule),
      },
      {
        path: 'favorite',
        loadChildren: () =>
          import('../favorite/favorite.module').then(
            (m) => m.FavoritePageModule
          ),
      },
      {
        path: 'download',
        loadChildren: () =>
          import('../download/download.module').then(
            (m) => m.DownloadPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
