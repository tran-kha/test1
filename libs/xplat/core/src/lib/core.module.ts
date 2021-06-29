import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
  Inject,
} from '@angular/core';
import { APP_BASE_HREF, CommonModule } from '@angular/common';

// libs
import { TranslateService } from '@ngx-translate/core';
import { throwIfAlreadyLoaded } from '@vgm/xplat/utils';

// app
import { environment } from './environments/environment';
import { LogService } from './services/log.service';
import { PlatformLanguageToken } from './services/tokens';
import { WindowService } from './services/window.service';
import { LocalforageService } from './services/localforage.service';
import { DataFetchService } from './services';
import { AvatarService } from './services/avatar.service';
import { PlayerService } from './services/player.service';

/**
 * DEBUGGING
 */
LogService.DEBUG.LEVEL_4 = !environment.production;

@NgModule({
  imports: [CommonModule],
})
export class CoreModule {
  // configuredProviders: *required to configure WindowService and others per platform
  static forRoot(
    configuredProviders: Array<any>
  ): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        LogService,
        WindowService,
        LocalforageService,
        DataFetchService,
        AvatarService,
        PlayerService,
        {
          provide: APP_BASE_HREF,
          useValue: '/',
        },
        ...configuredProviders,
      ],
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
    @Inject(PlatformLanguageToken) lang: string,
    translate: TranslateService
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');

    // ensure default platform language is set
    translate.use(lang);
  }
}
