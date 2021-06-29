import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';

import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [CoreModule, SharedModule, AppRoutingModule, NgxElectronModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
