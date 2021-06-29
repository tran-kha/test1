import { Injectable } from '@angular/core';
import { core } from '@vgm/xplat/core';
import { BehaviorSubject } from 'rxjs';
import { LocalforageService } from './localforage.service';
import * as KardiaClient from 'kardia-js-sdk';
import { ABI, bytesCode } from './smc';

export type DataFetchRootType = 'video' | 'audio';

@Injectable({
  providedIn: 'root',
})
export class DataFetchService {
  private vgmCore: any;
  private _isInitialized: boolean = false;
  private kardiaClient = new KardiaClient.default({
    endpoint: 'https://rpc.kardiachain.io',
  });

  public whenInitialized$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private localforageService: LocalforageService) {
    this.kardiaClient.contract.updateAbi(ABI);
    this.kardiaClient.contract.updateByteCode(bytesCode);
  }

  /**
   * Finding gateway (web/mobile) and establish IPFS connection (desktop)
   * In the future, we may use js-ipfs in a service worker to improve this process.
   */
  async init() {
    const deployedContract = this.kardiaClient.contract.invokeContract(
      'getAll',
      [1]
    );
    const defaultInvokePayload = deployedContract.getDefaultTxPayload();
    const estimatedGasForInvoke = await deployedContract.estimateGas(
      defaultInvokePayload
    );
    const instructor = await deployedContract.call(
      '0x450B468C834d684dD0482CCD6e2360e10c8D6C18',
      {
        gas: estimatedGasForInvoke * 10,
      },
      'latest'
    );
    console.log(`transaction hash:`, instructor);
    return new Promise((resolve) => {
      this.vgmCore = core(
        {
          preferGateways: instructor.gateway,
          exclude: ['06'],
          storage: {
            set: this.localforageService.set,
            get: this.localforageService.get,
          },
          config: {
            api: instructor.api,
            gateway: instructor.gateway,
            api_version: instructor.api_version,
            thumbnails: instructor.thumbnails,
          },
        },
        async () => {
          this._isInitialized = true;
          this.whenInitialized$.next(true);
          resolve(null);
        }
      );
    });
  }

  get isInitialized() {
    return this._isInitialized;
  }

  /**
   * Fetch root topic and cache it locally.
   * @param rootKey Can be: 'video' or 'audio'
   */
  async fetchRoot(rootKey: DataFetchRootType) {
    const storageKey = `home.${rootKey}`;
    const cacheList: any = await this.localforageService.get(storageKey);
    let list: any[] = [];
    if (!cacheList) {
      list = await this.vgmCore.navigator.fetchHomeList(rootKey);
      await this.localforageService.set(storageKey, list);
      console.log(`Saved ${list.length} item to local storage`);
    } else {
      console.log(`Load ${cacheList.length} item from local storage`);
      list = cacheList;
    }
    return list;
  }

  async fetchTopic(topicUrl: string) {
    if (!this._isInitialized) {
      await this.init();
    }
    return this.vgmCore.navigator.fetchTopicList(topicUrl);
  }

  async fetchItemList(topicUrl: string) {
    if (!this._isInitialized) {
      await this.init();
    }
    return this.vgmCore.navigator.fetchItemList(topicUrl);
  }

  async fetchSingleItem(itemUrl: string) {
    if (!this._isInitialized) {
      await this.init();
    }
    return this.vgmCore.navigator.fetchSingleItem(itemUrl);
  }

  getThumbnailUrl(item: any): string {
    return this.vgmCore.getThumbnailUrl(item, 240, 0);
  }

  getPlayUrl(item: any): string {
    return this.vgmCore.getPlayUrl(item);
  }
}
