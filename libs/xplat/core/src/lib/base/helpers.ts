import axios, {AxiosResponse} from 'axios';
import pRetry from 'p-retry';

import { Item } from './model';
import { getPlayHash } from './crypto';

export const fetch = async (
  url: string,
  timeout: number = 7000,
  retries: number = 1,
): Promise<AxiosResponse<any>> => {
  const toFetch = async (): Promise<AxiosResponse<any>> => {
    const response = await axios.request({url, timeout});
    if (response.status === 404) {
      throw new pRetry.AbortError(response.statusText);
    }
    return response;
  };
  return pRetry(toFetch, {
    retries,
    onFailedAttempt: error => {
      process.env.NODE_ENV === 'development' && console.log(
        `[WARN] Fetch ${url} attempt ${error.attemptNumber} failed. There are ${
          (error as any).retriesLeft
        } attempts left.`,
      );
    },
  });
};

export const getThumbnailUrl = (gateway: string, hash: string, size: number = 480, select: number = 1) => {
  const imageNo = select !== 0 ? select : Math.floor(Math.random() * 4) + 1;
  return `${gateway}/ipfs/${hash}/${size}/${imageNo}.png`;
}

export const getPlayUrl = (gateway: string, item: Item, isVideo: boolean = true) => {
  const { url, hash } = item;
  const streamHash = getPlayHash(url, hash);
  const playUrl = `${gateway}/ipfs/${streamHash}/${
    isVideo ? 'playlist.m3u8' : '128p.m3u8'
    }`;
  return playUrl;
};
