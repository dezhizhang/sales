/*
 * :file description:
 * :name: /sales/src/pages/banner/constants.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-09-16 22:45:12
 * :last editor: 张德志
 * :date last edited: 2023-09-17 09:48:47
 */

// 操作类型
export const OPERATION_TYPE = {
  CREATE: 'CREATE',
  EDITOR: 'EDITOR',
};

export const OPERATION_TEXT: any = {
  [OPERATION_TYPE.CREATE]: '新增轮播图',
  [OPERATION_TYPE.EDITOR]: '编辑轮播图',
};

export const WEBSITE_TYPE = [
  {
    label: '顶部',
    value: 'top',
  },
  {
    label: '中间',
    value: 'middle',
  },
  {
    label: '底部',
    value: 'bottom',
  },
];

export const STATUS_TYPE = [
  {
    label: '启用',
    value: 'enable',
  },
  {
    label: '禁用',
    value: 'disable',
  },
];

export const DEFAULT_PAGINATION = {
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  pageSizeOptions: ['10', '50', '100', '150', '200'],
};
