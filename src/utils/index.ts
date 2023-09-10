/*
 * :file description:
 * :name: /sales/src/utils/index.ts
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-11-18 20:54:29
 * :last editor: 张德志
 * :date last edited: 2023-09-10 22:39:31
 */

export const empty = (str?: string) => {
  return str ?? '--';
};

export const format = (str?: string) => {
  return str ?? 'YYYY-MM-DD HH:mm:ss';
};
