import { deleteRes, get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { PauseOperate } from 'types/setting/manage/pause-operate';
import { RequestTableParam, TypeUtil } from 'types/utils';

/**
 * 获取使用设置列表
 * @date 2022-01-05 10:01:37
 * @param params
 * @returns {Promise<unknown>}
 */
export async function getPauseOperateList(
  params: RequestTableParam,
): Promise<TypeUtil.RequestResult<PauseOperate.PauseOperateItem[], number>> {
  return get(`/venue-service/${version}/cgs/closure/list`, params);
}

/**
 * 删除场地使用设置
 * @date 2022-04-28 17:19:32
 * @param id
 */
export async function deletePauseOperate(id: string): Promise<TypeUtil.RequestResult> {
  return deleteRes(`/venue-service/${version}/cgs/closure/${id}`);
}

/**
 * 根据id获取对应场地的使用设置
 * @date 2022-01-05 10:02:26
 * @param id
 * @returns {Promise<unknown>}
 */
export async function fetchPauseOperateById(
  id: string,
): Promise<TypeUtil.RequestResult<PauseOperate.PauseOperateItem>> {
  return get(`/venue-service/${version}/cgs/closure/${id}`);
}

/**
 * 保存场馆的使用设置
 * @date 2022-01-05 10:03:11
 * @param data
 * @returns {Promise<unknown>}
 */
export async function addPauseOperate(
  data: PauseOperate.PauseOperateItem,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/cgs/closure/save`, { ...data });
}
