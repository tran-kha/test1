import { IEnvironment } from '@vgm/xplat/core';
import { deepMerge } from '@vgm/xplat/utils';
import { environmentBase } from './environment.base';

export const environmentProd = deepMerge(environmentBase, <IEnvironment>{
  production: true,
  // customizations here...
});
