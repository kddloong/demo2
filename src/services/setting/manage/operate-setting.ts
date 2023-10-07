import { deleteRes, get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { RequestIdData, RequestSelectData, RequestTableParam, TypeUtil } from 'types/utils';
import {
  OperateBaseSetting,
  OperatePriceSetting,
  OperateSetting,
} from '../../../../types/setting/manage/operate-setting';

/**
 * 获取在运营中的场地的数据
 * @date 2022-01-05 20:32:23
 * @param params
 * @returns {Promise<unknown>}
 */
export async function getOperateSettingList(
  params: RequestTableParam,
): Promise<TypeUtil.RequestResult<OperateSetting.OperateSettingItem[], number>> {
  return get(`/venue-service/${version}/cgs/venue/operate/list`, params);
}

/**
 * 恢复营业
 * @date 2022-01-17 10:59:11
 * @param id
 * @returns {Promise<unknown>}
 */
export async function startOperating(id: string): Promise<TypeUtil.RequestResult> {
  return post('/cgs/venue/operate/saveStart', { id });
}

/**
 * 暂停营业
 * @date 2022-01-17 10:59:53
 * @param id
 * @returns {Promise<unknown>}
 */
export async function endOperating(id: string): Promise<TypeUtil.RequestResult> {
  return post('/cgs/venue/operate/saveEnd', { id });
}

/**
 * 获取场地区域的属性结构, 或者场地类型
 * @date 2022-04-29 10:15:20
 * @author ssss
 * @url 场馆管理-场馆管理-API
 */
export async function getVenueAreaForParentId(): Promise<RequestSelectData> {
  return get(`/venue-service/${version}/cgs/venue/venueAreaList`);
}

/**
 * 删除场地类型 数据
 * @param venueId
 */
export async function deleteOperateSetting(venueId: string): Promise<TypeUtil.RequestResult> {
  return deleteRes(`/venue-service/${version}/cgs/venue/operate/deleteVenue/${venueId}`);
}

/**
 * 保存基本信息设置
 * @param data {OperateSetting.OperateBaseSettingInfo}
 * @date 2022-04-29 13:16:06
 * @author ssss
 */
export async function saveBasicOperateSetting(
  data: OperateSetting.OperateBaseSettingInfo,
): Promise<RequestIdData> {
  return post(`/venue-service/${version}/cgs/venue/operate/save`, data);
}

/**
 * 获取当前场馆的基本信息
 * @date 2022-04-29 13:45:27
 * @param id VenueId
 * @author ssss
 */
export async function getCurrentBasicOperateSetting(
  id: string,
): Promise<TypeUtil.RequestResult<OperateSetting.OperateBaseSettingInfo>> {
  return get(`/venue-service/${version}/cgs/venue/operate/${id}`);
}

/**
 * 保存场馆的运营设置
 * @date 2022-01-06 09:07:55
 * @param data
 */
export async function saveOperate(
  data: OperateBaseSetting.OperateBaseSettingItem,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/cgs/venue/operate/saveOperate`, { ...data });
}

/**
 * 保存价格设置
 * @date 2022-01-06 11:24:25
 * @param data
 */
export async function savePriceSetting(
  data: OperatePriceSetting.OperatePriceSettingItem,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/cgs/venue/operate/saveCharge`, { ...data });
}

/**
 * 根据id获取场馆的基本运营设置
 * @date 2022-01-06 09:52:03
 * @param id
 */
export async function getOperateSettingById(
  id: string,
): Promise<TypeUtil.RequestResult<OperateBaseSetting.OperateBaseSettingItem>> {
  return get(`/venue-service/${version}/cgs/venue/operate/operate/${id}`);
}

/**
 * 获取保存的收费设置
 * @date 2022-01-06 17:05:02
 * @param id
 * @param chargingType
 * @param weekOrDay
 * todo 貌似重复了
 */
export async function getOperatePriceSetting(
  id: string,
  chargingType: string,
  weekOrDay: string,
): Promise<TypeUtil.RequestResult<OperatePriceSetting.OperatePriceSettingItem>> {
  return get(`/venue-service/${version}/cgs/venue/operate/charge`, {
    id,
    chargingType,
    weekOrDay,
  });
}

/**
 * 删除按星期时间计费明细
 * @date 2022-01-06 09:48:44
 * @param id
 */
export async function deleteTimeWeekCharging(id: string): Promise<TypeUtil.RequestResult> {
  return deleteRes(`/venue-service/${version}/cgs/venue/operate/deleteTimeWeek/${id}`);
}

/**
 * 删除按日期时间计费明细
 * @date 2022-01-06 10:20:43
 * @param id
 */
export async function deleteTimeDayCharging(id: string): Promise<TypeUtil.RequestResult> {
  return deleteRes(`/venue-service/${version}/cgs/venue/operate/deleteTimeDay/${id}`);
}

/**
 * 删除按星期次数计费明细
 * @date 2022-01-06 10:24:16
 * @param id
 */
export async function deleteNumberWeekCharging(id: string): Promise<TypeUtil.RequestResult> {
  return deleteRes(`/venue-service/${version}/cgs/venue/operate/deleteNumberDay/${id}`);
}

/**
 * 删除按日期次数计费明细
 * @date 2022-01-06 11:36:06
 * @param id
 */
export async function deleteNumberDayChargine(id: string): Promise<TypeUtil.RequestResult> {
  return deleteRes(`/venue-service/${version}/cgs/venue/operate/deleteNumberWeek/${id}`);
}

/**
 * 删除按票星期计费明细
 * @date 2022-01-06 11:37:10
 * @param id
 */
export async function deleteTicketWeekCharging(id: string): Promise<TypeUtil.RequestResult> {
  return deleteRes(`/venue-service/${version}/cgs/venue/operate/deleteTicketWeek/${id}`);
}

/**
 * 删除门票按日期计费
 * @date 2022-01-06 11:38:37
 * @param id
 */
export async function deleteTicketDayCharging(id: string): Promise<TypeUtil.RequestResult> {
  return deleteRes(`/venue-service/${version}/cgs/venue/operate/deleteTicketDay/${id}`);
}

/**
 * 删除按时间假日明细
 * @date 2022-01-06 17:03:44
 * @param id
 */
export async function deleteTimeHolidays(id: string): Promise<TypeUtil.RequestResult> {
  return deleteRes(`/venue-service/${version}/cgs/venue/operate/deleteTimeHoliday/${id}`);
}

/**
 * 删除按次数假日明细
 * @date 2022-01-07 21:48:44
 * @param id
 */
export async function deleteNumberHolidays(id: string): Promise<TypeUtil.RequestResult> {
  return deleteRes(`/venue-service/${version}/cgs/venue/operate/deleteNumberHoliday/${id}`);
}

/**
 * 删除按门票假日明细
 * @param id
 */
export async function deleteTicketHolidays(id: string): Promise<TypeUtil.RequestResult> {
  return deleteRes(`/venue-service/${version}/cgs/venue/operate/deleteTicketHoliday/${id}`);
}
