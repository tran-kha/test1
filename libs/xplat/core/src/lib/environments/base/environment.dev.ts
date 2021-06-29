import { IEnvironment } from '@vgm/xplat/core';
import { deepMerge } from '@vgm/xplat/utils';
import { environmentBase } from './environment.base';

export const environmentDev = deepMerge(environmentBase, <IEnvironment>{
  // customizations here...
});
