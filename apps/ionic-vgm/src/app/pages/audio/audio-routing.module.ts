import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AudioPage } from './audio.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/muc-luc/audio/catalog/home.audio',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AudioPage,
    children: [
      {
        path: 'catalog/:topicUrl',
        loadChildren: () =>
          import('./audio-catalog/audio-catalog.module').then(
            (m) => m.AudioCatalogPageModule
          ),
      },
      {
        path: 'playlist/:topicUrl',
        loadChildren: () =>
          import('./audio-playlist/audio-playlist.module').then(
            (m) => m.AudioPlaylistPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudioPageRoutingModule {}
