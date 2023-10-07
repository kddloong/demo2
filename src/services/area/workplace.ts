import { get, post } from '@/services/request/request_tools';
import {
  CLIENT_VERSION as version,
  CLIENT_VERSION_V2,
  CLIENT_VERSION_V2 as version2,
} from '@/utils/utils';
import { RequestIdData, TypeUtil } from 'types/utils';
import {
  AreaWorkplace,
  BookSite,
  BookSiteContent,
  CreateBookOrder,
  StartOrderTable,
} from 'types/area/workplace';
import { VenueStartOrder } from 'types/area/start';

/**
 * 获取本场馆的场管区域为场地的列表, 作为tab页
 * @date 2022-05-23
 * 修改原因, 使用模式为计时的都是场地
 */
export async function getAreaManageData(): Promise<
  TypeUtil.RequestResult<AreaWorkplace.AreaTabItem[]>
> {
  return get(`/venue-service/${version}/cgs/venue/operateVenueTimeList`);
}

/**
 * 获取当前时间的场地的状态
 * @date 2022-01-19 13:08:31
 * @param id
 */
export async function getCurrentStartingOrder(
  id: string,
): Promise<TypeUtil.RequestResult<StartOrderTable.WorkPlaceStartOrderItem[]>> {
  return get(`/venue-service/${version}/cgs/venue/status/currentOrderList/${id}`);
}

/**
 * 用于控制台, 获取当前场地区域下的场地
 * @date 2022-05-17 16:44:15
 * @param venueId
 */
export async function getAreaVenueIdSelectData(
  venueId: string,
): Promise<TypeUtil.RequestSelectData> {
  return get(`/venue-service/${version}/cgs/venue/venueSelectListByParentId`, { venueId });
}

/**
 * 获取场地的价格
 * @param data
 */
export async function getVenueAreaPrice(data: {
  venueId: string;
  timeFrom: string;
  timeTo: string;
  bookDate: string;
}): Promise<TypeUtil.RequestResult<number>> {
  return get(`/venue-service/${version}/cgs/venue/calTimePrice`, data);
}

/**
 * 结束开场订单
 * @param {object} data
 * @param {string} data.id 订单id
 */
export async function finishUseOrder(
  data: TypeUtil.BaseOrderParams,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/use/finishUseOrder`, data);
}

/**
 * 清场
 * @param {object} data
 * @param {string} data.venueId 场馆类型id
 */
export async function finishAllUseOrder(data: { id: string }): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/use/finishAllUseOrder`, data);
}

/**
 * 根据子订单id进行预定转开场
 * @param details 子订单ids
 * @param id 主订单id
 */
export async function doReverseToStart(
  details: string,
  id: string,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/order/savePcBookOrderToUseByDetailId`, {
    detailIds: details,
    id,
  });
}

/**
 * 更换子订单预定场地
 * @date 2022-05-17 17:06:29
 * @param venueId
 * @param orderDetailId
 * @param type '0' 是 开场, '1'是 预定
 * @return 返回订单的id
 */
export async function modifyScheduleArea(
  venueId: string,
  orderDetailId: string,
  type: '0' | '1',
): Promise<TypeUtil.RequestResult<string>> {
  return post(`/venue-service/${version}/use/order/changeVenue`, { venueId, orderDetailId, type });
}

/**
 * 获取场地的状态
 * @date 2022-01-20 15:36:05
 * @param date
 * @param venueId
 */
export async function getVenueSchedule(
  venueId: string,
  date: string,
): Promise<TypeUtil.RequestResult<BookSiteContent.AreaStatusInfo>> {
  return get(`/venue-service/${CLIENT_VERSION_V2}/cgs/venue/status/info`, {
    currentDate: date,
    id: venueId,
  });
}

/**
 * 获取场馆的开放时间
 * @date 2022-01-21 09:23:58
 * @param {String} venueId
 * @param currentDate
 * @param type 区分低免 和正常
 */
export async function getOperationTimeRange(
  venueId: string,
  currentDate: string,
  type: string,
): Promise<TypeUtil.RequestResult<BookSite.OperateTimeRangeItem>> {
  return get(`/venue-service/${version2}/cgs/venue/status/time`, {
    id: venueId,
    currentDate,
    type,
  });
}

/**
 * 根据venueid获取可提前几天预定
 * @param venueId
 */
export async function fetchDaysCanBookInAdvance(
  venueId: string,
): Promise<TypeUtil.RequestResult<number>> {
  return get(`/venue-service/${version}/app/venue/showTime/${venueId}`, {});
}

/**
 * 获取订单的详细信息
 * @date 2022-01-24 15:06:49
 * @param id
 * @namespace AreaWorkplaceManage
 */
export async function getOrderInfoFromWorkplaceStatusId(
  id: string,
): Promise<
  TypeUtil.RequestResult<AreaWorkplace.StartWorkplaceItem | AreaWorkplace.ScheduleWorkplaceItem>
> {
  return get(`/venue-service/${version}/cgs/venue/status/orderInfo/${id}`);
}

/**
 * 获取开场订单的详细信息
 * @date 2022-01-24 15:06:49
 * @param id
 * @namespace VenueStartOrder
 */
export async function fetchStartOrderInfoByOrderId(
  id: string,
): Promise<TypeUtil.RequestResult<VenueStartOrder.StartOrderItem>> {
  return get(`/venue-service/${version}/use/use/order/${id}`);
}

/**
 * 根据orderNo获取开场订单
 * @param orderNo
 */
export async function fetchStartOrderByOrderNo(
  orderNo: string,
): Promise<TypeUtil.RequestResult<VenueStartOrder.VenueStartOrderOriginalItem>> {
  return get(`/venue-service/${version}/use/use/get/order/${orderNo}`, {});
}

/**
 * 创建预定订单
 * @date 2022-05-23
 * @param data
 */
export async function saveAreaReverse(
  data: CreateBookOrder.CreateBookOrderItem,
): Promise<RequestIdData> {
  return post(`/venue-service/${version}/use/order/saveBookOrder`, data);
}

/**
 * todo
 * 返回按日期的所有加个列表
 * @param venueId
 */
export async function fetchVenueDatePrice(venueId: string): Promise<TypeUtil.RequestResult> {
  return get(`/venue-service/${version}/cgs/venue`, { venueId });
}

/**
 * todo
 * 返回当前时间，可用的价格列表
 * @param venueId
 */
export async function fetchVenueCurrentPrice(venueId: string): Promise<TypeUtil.RequestResult> {
  return get(`/${version}/use/order/price/list/${venueId}`, { venueId });
}
