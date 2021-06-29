export interface Topic {
  id: string;
  pid: string;
  url: string;
  name: string;
  count: string;
  list?: Topic[];
  items?: Item[];
}

export interface Item {
  id: string;
  name: string;
  duration: string;
  audience: number;
  size: number;
  mtime: number;
  url: string;
  location: string;
  hash: string;
  thumb: string;
}

export interface Breadcrumb {
  topicId: string;
  name: string;
  level: number;
}

export interface TopicList {
  id: string;
  pid: string;
  name: string;
  audience: string;
  url: string;
  breadcrumb: Breadcrumb[];
  count: number;
  isLeaf: boolean;
  isVideo: boolean;
  list: Topic[];
}

export interface ItemList {
  id: string;
  pid: string;
  name: string;
  audience: number;
  url: string;
  count: number;
  isLeaf: boolean;
  isVideo: boolean;
  breadcrumb: Breadcrumb[];
  list: Item[];
}

export interface LocalStorageIO {
  set: (key: string, data: unknown, expire?: number | boolean) => void;
  get: (key: string) => Promise<unknown>;
}

export interface CoreConfig {
  api: string;
  gateway: string;
  thumbnails: string;
  api_version: number;
}

export interface CoreOptions {
  /**
   * Prefer gateways in order
   */
  preferGateways?: string[];
  /**
   * Exclude list of item name
   */
  exclude?: string[];
  storage?: LocalStorageIO;
  config?: CoreConfig;
}

export interface CoreCallback {
  (): void;
}
