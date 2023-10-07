import { get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { RequestTableParam, TreeData, TypeUtil } from 'types/utils';
import { UseSetting } from 'types/setting/manage/use-setting';

/**
 * 获取使用设置列表
 * @date 2022-01-05 10:01:37
 * @param params
 * @returns {Promise<unknown>}
 */
export async function getUseSettingList(
  params: RequestTableParam,
): Promise<TypeUtil.RequestResult<UseSetting.UseSettingItem[], number>> {
  return get(`/venue-service/${version}/cgs/venue/use/list`, params);
}

/**
 * 场地的属性结构
 * 返回 一个树形结构数据
 * @date 2022-04-29 09:55:31
 */
export async function getAreaForParentId(): Promise<TreeData> {
  return get(`/cgs/venue/venueAreaUseList`);
}

/**
 * 根据id获取对应场地的使用设置
 * @date 2022-01-05 10:02:26
 * @param id
 * @returns {Promise<unknown>}
 */
export async function getUseSettingById(
  id: string,
): Promise<TypeUtil.RequestResult<UseSetting.UseSettingItem>> {
  return get(`/venue-service/${version}/cgs/venue/use/${id}`);
}

/**
 * 保存场馆的使用设置
 * @date 2022-01-05 10:03:11
 * @param data
 * @returns {Promise<unknown>}
 */
export async function addUseSetting(
  data: UseSetting.UseSettingItem,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/cgs/venue/use/save`, { ...data });
}
