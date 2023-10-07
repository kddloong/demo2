import { deleteRes, get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { LabelValueItem, RequestTableParam, TypeUtil } from 'types/utils';
import { Holiday } from '../../../../types/setting/base-setting/holiday';

/**
 * 获取节假日列表
 * @date 2022-09-19
 * yu
 * @param params
 * @returns {Promise<unknown>}
 */
export async function fetchHolidayList(
  params: RequestTableParam,
): Promise<TypeUtil.RequestResult<Holiday.HolidayItem[]>> {
  return get<TypeUtil.RequestResult<Holiday.HolidayItem[]>>(
    `/venue-service/${version}/cgs/holiday/list`,
    params,
  );
}

/**
 * 根据id获取详细的节假日信息
 * date 2022-09-19
 * yu
 * @param id
 * @returns {Promise<unknown>}
 */
export async function getHolidayDataById(
  id: string,
): Promise<TypeUtil.RequestResult<Holiday.HolidayItem>> {
  return get(`/venue-service/${version}/cgs/holiday/${id}`);
}

/**
 * 保存或修改节假日列表
 * @date 2022-09-19
 * @param data
 * @author yu
 * @returns {Promise<unknown>}
 */
export async function saveHoliday(data: Holiday.HolidayItem): Promise<TypeUtil.RequestResult> {
  return post<TypeUtil.RequestResult>(`/venue-service/${version}/cgs/holiday/save`, data);
}

/**
 * 删除节假日
 * @date 2022-09-19
 * yu
 * @param id
 * @returns {Promise<unknown>}
 */
export async function deleteHoliday(id: string): Promise<TypeUtil.RequestResult> {
  return deleteRes(`/venue-service/${version}/cgs/holiday/${id}`);
}

/**
 * 获取节假日下拉框
 */
export async function fetchHolidaySelect(): Promise<TypeUtil.RequestResult<LabelValueItem[]>> {
  return get(`/venue-service/${version}/cgs/holiday/holidaySelect`, {});
}

/**
 * 获取节假日日历的数据
 * @param params
 */
export async function fetchHolidayCalendar(
  params: Holiday.HolidayCalendarParams,
): Promise<TypeUtil.RequestResult<Record<string, string>[]>> {
  return get<TypeUtil.RequestResult<Record<string, string>[]>>(
    `/venue-service/${version}/cgs/holiday/findQueryList`,
    { ...params },
  );
}

/**
 * 获取节假日列表模式的数据
 * @param params
 */
export async function fetchHolidayTableList(params: TypeUtil.RequestTableParams): Promise<TypeUtil.RequestTableResult<Holiday.HolidayItem[]>>{
    return get(`/venue-service/${version}/cgs/holiday/list/all`, params)
}
