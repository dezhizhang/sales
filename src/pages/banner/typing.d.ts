/*
 * :file description:
 * :name: /sales/src/pages/banner/typing.d.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-09-09 14:24:05
 * :last editor: 张德志
 * :date last edited: 2023-09-16 22:36:18
 */
declare namespace Banner {
  type RequestType = {
    title?: string;
    type?: string;
    status?: string;
    pageIndex?: number;
    pageSize?: number;
  };

  interface BannerType {
    add_time: string;
    description: string;
    link: string;
    review: string;
    title: string;
    status: string;
    id: string;
  }
  interface ResponseInfo {
    stat: number;
    msg: string;
    result: ResponseData;
  }
  interface ResponseData {
    total?: number;
    data?: DataType[];
    code: number;
  }
}
