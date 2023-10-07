import { CLIENT_VERSION as version } from '@/utils/utils';
import { Area } from '../../../../types/main/main/area';
import { get, post } from '@/services/request/request_tools';
import { RequestTableParam, TypeUtil } from 'types/utils';

/**
 * 获取区域列表的数据
 * @date 2021.12.27
 * @param params
 * @returns {Promise<unknown>}
 */
export async function fetchAreaList(
  params: RequestTableParam,
): Promise<TypeUtil.RequestResult<Area.AreaItem[]>> {
  return get(`/venue-service/${version}/cgs/area/list`, params);
}

/**
 * 根据id获取子节点的获取
 * @param id
 * @returns {Promise<unknown>}
 */
export async function fetchAreaDataById(
  id: string,
): Promise<TypeUtil.RequestResult<Area.AreaItem>> {
  return get(`/venue-service/${version}/cgs/area/${id}`);
}

/**
 * 保存区域
 * @date 2022-01-05 15:48:12
 * @param data
 * @param id
 * @returns {Promise<unknown>}
 */
export async function addAreaData(
  data: Area.AreaItem,
  id: string,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/cgs/area/save`, { ...data, id });
}

/**
 * 获取省级信息，用于select
 * @date 2022-02-17 10:44:03
 * @returns {Promise<unknown>}
 */
export async function getProvinceSelectData(): Promise<TypeUtil.RequestSelectData> {
  return get(`/venue-service/${version}/cgs/area/provinceList`);
}

/**
 * 根据上级id获取市或者区的数据，用于Select
 * @date 2022-02-17 10:49:46
 * @param id
 */
export async function getChildrenSelectData(id: string): Promise<TypeUtil.RequestSelectData> {
  return get(`/venue-service/${version}/cgs/area/children/${id}`);
}
