import { NgModule } from '@angular/core';
import { VgmElectronCoreModule } from '@vgm/xplat/electron/core';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [AppModule, VgmElectronCoreModule],
  bootstrap: [AppComponent],
})
export class AppElectronModule {}
