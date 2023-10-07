import { deleteRes, get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { LabelValueItem, RequestTableParam, TypeUtil } from 'types/utils';
import { TimeInterval } from '../../../../types/setting/base-setting/time-interval';

interface TimeIntervalItem extends LabelValueItem {
  beginTime: string;
  endTime: string;
}

/**
 * 获取时段列表
 * @date 2022-01-05 11:31:20
 * @param params
 * @returns {Promise<unknown>}
 */
export async function getTimeInterval(
  params: RequestTableParam,
): Promise<TypeUtil.RequestTableResult<TimeInterval.TimeIntervalItem[]>> {
  return get(`/venue-service/${version}/cgs/time/interval/list`, params);
}

/**
 * 根据id获取时段信息
 * @date 2022-01-05 11:31:05
 * @param id
 * @returns {Promise<unknown>}
 */
export async function getTimeIntervalDataById(
  id: string,
): Promise<TypeUtil.RequestResult<TimeInterval.TimeIntervalItem[]>> {
  return get(`/venue-service/${version}/cgs/time/interval/${id}`);
}

/**
 * 保存或修改时段
 * @date 2022-01-05 11:27:38
 * @param data
 * @param id
 * @returns {Promise<unknown>}
 */
export async function saveTimeInterval(
  data: TimeInterval.TimeIntervalItem,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/cgs/time/interval/save`, data);
}

/**
 * 删除时段
 * @date 2022-01-05 11:27:11
 * @param id
 * @returns {Promise<unknown>}
 */
export async function deleteTimeInterval(id: string): Promise<TypeUtil.RequestResult> {
  return deleteRes(`/venue-service/${version}/cgs/time/interval/${id}`);
}

/**
 * 获取时段列表
 * @date 2022-01-07 09:09:17
 * @returns {Promise<unknown>}
 */
export async function getTimeIntervalSelectList(): Promise<
  TypeUtil.RequestResult<TimeIntervalItem[]>
> {
  return get(`/venue-service/${version}/cgs/time/interval/timeIntervalList`);
}
