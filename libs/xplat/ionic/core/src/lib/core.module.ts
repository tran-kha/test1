import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { throwIfAlreadyLoaded } from '@vgm/xplat/utils';
import { VgmCoreModule } from '@vgm/xplat/web/core';

import { fancyAnimation } from './animation';

@NgModule({
  imports: [
    VgmCoreModule,
    // ROOT IONIC MODULE
    // IonicModule.forRoot({ navAnimation: fancyAnimation }),
    IonicModule.forRoot({
      rippleEffect: false,
      mode: 'ios',
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
})
export class VgmIonicCoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: VgmIonicCoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'VgmIonicCoreModule');
  }
}
