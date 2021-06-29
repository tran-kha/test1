import { Injectable } from '@angular/core';
import { LogService, WindowService } from '@vgm/xplat/core';
import { isElectron } from '@vgm/xplat/utils';
import * as childProcess from 'child_process';
import { ipcRenderer } from 'electron';
import IpcRendererEvent = Electron.IpcRendererEvent;

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  private readonly _ipc: typeof ipcRenderer;
  private _childProcess: typeof childProcess;

  constructor(private _log: LogService, private _win: WindowService) {
    // Conditional imports
    if (isElectron()) {
      this._ipc = this._win.require('electron').ipcRenderer;
      this._childProcess = this._win.require('child_process');
      this._log.debug('ElectronService ready.');
    }
  }

  on(
    channel: string,
    listener: (event: IpcRendererEvent, ...args: any[]) => void
  ): void {
    if (!this._ipc) {
      return;
    }

    this._ipc.on(channel, listener);
  }

  send(channel: string, ...args): void {
    if (!this._ipc) {
      return;
    }

    this._ipc.send(channel, ...args);
  }

  sendSync(channel: string, ...args): void {
    if (!this._ipc) {
      return;
    }

    this._ipc.sendSync(channel, ...args);
  }
}
