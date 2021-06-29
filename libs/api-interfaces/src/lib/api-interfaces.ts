export interface Message {
  message: string;
}

export interface ItemBase {
  audience: 0;
  duration: string;
  hash: string;
  id: string;
  location: string;
  mtime: number;
  name: string;
  size: number;
  thumb: string;
  url: string;
}

export interface TopicBase {
  audience: number;
  count: number;
  id: string;
  isLeaf: boolean;
  isVideo: boolean;
  items: ItemBase[];
  name: string;
  pid: string;
  url: string;
}

export interface Breadcrumb {
  level: number;
  name: string;
  topicId: string;
}

export interface TopicCategory {
  audience: 0;
  breadcrumb: Breadcrumb[];
  count: number;
  id: string;
  isLeaf: boolean;
  isVideo: boolean;
  list: TopicBase[];
  name: string;
  pid: string;
  url: string;
}
