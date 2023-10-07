import { get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { FreePerson } from 'types/setting/base-setting/free-person';
import { RequestTableParam, RequestTableResult, TypeUtil } from 'types/utils';

/**
 * 获取低免人群列表
 * @date 2022-01-05 13:25:26
 * @param params
 * @returns {Promise<unknown>}
 */
export async function getFreePerson(
  params: RequestTableParam,
): Promise<RequestTableResult<FreePerson.FreePersonItem[]>> {
  return get(`/venue-service/${version}/cgs/free/person/list`, params);
}

/**
 * 根据id获取低免人群
 * @date 2022-01-05 13:25:26
 * @param id
 * @returns {Promise<unknown>}
 */
export async function getFreePersonDataById(
  id: string,
): Promise<TypeUtil.RequestResult<FreePerson.FreePersonItem>> {
  return get(`/venue-service/${version}/cgs/free/person/${id}`);
}

/**
 * 保存或修改低免人群
 * @date 2022-01-05 13:25:26
 * @param data
 * @returns {Promise<unknown>}
 */
export async function saveFreePerson(
  data: FreePerson.FreePersonItem,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/cgs/free/person/save`, data);
}

/**
 * 获取启用的低免人群数据
 * @version 0.0.1
 * 2022-08-26 加上参数 type, '0'查所有, '1'查可用的
 * @date 2022-01-06 20:45:53
 * @returns {Promise<unknown>}
 */
export async function getStartFreePerson(
  type: string = ALL_FOR_SELECT_DATA,
): Promise<TypeUtil.RequestSelectData> {
  return get(`/venue-service/${version}/cgs/free/person/freePersonList`, { type });
}
