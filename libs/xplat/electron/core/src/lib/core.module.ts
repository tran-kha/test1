import { NgModule, Optional, SkipSelf } from '@angular/core';

import { throwIfAlreadyLoaded } from '@vgm/xplat/utils';
import { ELECTRON_PROVIDERS, ElectronService } from './services';

@NgModule({
  providers: [...ELECTRON_PROVIDERS],
})
export class VgmElectronCoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: VgmElectronCoreModule,
    private _electronService: ElectronService
  ) {
    throwIfAlreadyLoaded(parentModule, 'VgmElectronCoreModule');
  }
}
