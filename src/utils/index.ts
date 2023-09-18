/*
 * :file description:
 * :name: /sales/src/utils/index.ts
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-11-18 20:54:29
 * :last editor: 张德志
 * :date last edited: 2023-09-18 09:15:23
 */

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@/constants';

export const empty = (str?: string) => {
  return str ?? '--';
};

export const format = (str?: string) => {
  return str ?? 'YYYY-MM-DD HH:mm:ss';
};

/**
 * @description: 转换参数
 * @param {any} params
 * @return {*}
 */
export const transformToParams = (params: any = {}) => {
  params.pageIndex = params?.pageIndex || DEFAULT_PAGE_INDEX;
  params.pageSize = params?.pageSize || DEFAULT_PAGE_SIZE;
  for (let key in params) {
    if (params[key] === '') {
      params[key] = undefined;
    }
  }
  return params;
};
