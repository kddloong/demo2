import { get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { TreeData, TypeUtil } from 'types/utils';
import { VenueSetting } from 'types/setting/manage/venue-setting';

/**
 * 获取场馆信息管理的数据(场馆)
 * @date 2022-05-23
 * @param params
 * @returns {Promise<unknown>}
 */
export async function getVenueSettingList(
  params: VenueSetting.VenueSettingListParams,
): Promise<TypeUtil.RequestTableResult<VenueSetting.VenueSettingItem[]>> {
  return get(`/venue-service/${version}/cgs/venue/manager/list`, params);
}

/**
 * 根据id获取场馆的设置信息
 * @date 2022-04-28 15:55:57
 * @param id
 * @returns {Promise<unknown>}
 */
export async function getVenueSettingById(
  id: string,
): Promise<TypeUtil.RequestResult<VenueSetting.VenueSettingItem>> {
  return get(`/venue-service/${version}/cgs/venue/manager/${id}`);
}

/**
 * 保存某个场馆的场馆信息设置
 * @date 2022-04-28 15:57:49
 * @param data
 * @returns {Promise<unknown>}
 */
export async function saveVenueSetting(
  data: VenueSetting.VenueSettingItem,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/cgs/venue/manager/save`, { ...data });
}

/**
 * 获取场馆的树形结构
 * @date 2022-04-29 10:22:02
 * @author ssss
 * @url 场馆管理-场馆管理-API
 */
export async function getVenueForParentId(): Promise<TreeData> {
  return get(`/venue-service/${version}/cgs/venue/venueList`);
}
