/*
 * :file description:
 * :name: /sales/src/pages/banner/typing.d.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-09-09 14:24:05
 * :last editor: 张德志
 * :date last edited: 2023-09-17 11:17:44
 */
declare namespace Banner {
  // 创建轮播图
  type CreateBannerType = {
    name: string;
    link: string;
    url: string;
    position: string;
    status: string;
    description?: string;
  };

  interface BannerType {
    id: string;
    name: string;
    link: string;
    url: string;
    position: string;
    status: string;
    description?: string;
  }
  interface ResponseInfo {
    stat: number;
    msg: string;
    result: ResponseData;
  }
  interface ResponseData {
    total?: number;
    data: BannerType[];
    code: number;
  }
}
