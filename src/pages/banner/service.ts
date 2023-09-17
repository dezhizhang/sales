/*
 * :file description:
 * :name: /sales/src/pages/banner/service.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-09-09 14:24:05
 * :last editor: 张德志
 * :date last edited: 2023-09-17 14:50:41
 */
import request, { CGI_PREFIX } from '@/utils/request';

// 获取网站列表
export async function getBannerList(params: any): Promise<Banner.ResponseData> {
  return request(`${CGI_PREFIX.SALES}/banner/list`, {
    method: 'GET',
    params,
  });
}

// 新增网站
export async function createBannerInfo(params: Banner.CreateBannerType): Promise<any> {
  return request(`${CGI_PREFIX.SALES}/banner/add`, {
    method: 'POST',
    data: params,
  });
}

//删除网站
export async function getWebsiteDelete(params: { _id: string }): Promise<any> {
  return request(SERVICE_MAP.WEBSITE_DELETE, {
    method: 'DELETE',
    data: params,
  });
}

// 编辑网站
export async function putBannerUpdate(params: any): Promise<any> {
  return request(`${CGI_PREFIX.SALES}/banner/update`, {
    method: 'PUT',
    data: params,
  });
}
