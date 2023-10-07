import { get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import {
  SellTicketSpace,
  UserVenueManage,
  VenueTodayPriceManage,
  VenueView,
} from '../../../types/ticket/workplace';
import { TypeUtil } from 'types/utils';
import { BookSite } from 'types/area/workplace';

/**
 * 根据当前 登录的userId 来获取当前可以管理几个场馆
 * @date 2022-01-18 15:42:21
 * @namespace UserVenueManage
 */
export async function getVenueListByCurrentLogin(): Promise<
  TypeUtil.RequestResult<UserVenueManage.UserVenueItem[]>
> {
  return get(`/venue-service/${version}/cgs/venue/operateVenueTicketList`);
}

/**
 * 获取场地或场馆的概览
 * @date 2022-02-23 13:17:05
 * @param {String} type 0场地， 1场馆
 * @namespace VenueView
 */
export async function getWorkPlaceView(
  type: string,
): Promise<TypeUtil.RequestResult<VenueView.VenueViewItem[]>> {
  return get(`/venue-service/${version}/cgs/work/index/hello`, { type });
}

/**
 * 预定订单退款
 * @date 2022-01-13 13:23:07
 * @param orderNo
 * @param price
 */
export async function scheduleOrderRefund(
  orderNo: string,
  price: number,
  refundReason: string,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/order/refundTicket`, { orderNo, price, refundReason });
}

/**
 * 订单明细退款
 * @date 2022-01-13 13:56:14
 * @param detailId
 */
export async function orderDetailRefund(detailId: string): Promise<TypeUtil.RequestResult> {
  return post('/use/order/saveBackOrderDetail', { detailId });
}

/**
 * 获取今日场馆的开放信息
 * @date 2022-04-14 08:58:33
 * type 0正常价格， 1低免， 2假期价格
 * @param id {venueId}
 * @param date {dayjs}
 * @namespace VenueTodayPriceManage
 */
export async function getVenueOpenInfo(
  id: string,
  date: string,
): Promise<TypeUtil.RequestResult<VenueTodayPriceManage.VenueTodayPriceItem[]>> {
  return get(`/venue-service/${version}/cgs/venue/venuePriceList`, { venueId: id, date });
}

/**
 * 手工支付并核销订单
 * @date 2022-01-13 09:22:38
 * @param checkType 核销方式
 * @param id 订单ID
 * @param payType 付款方式
 * @param discountReasonId 折扣方式
 */
export async function payAndCheckPcOrder(
  checkType: string,
  id: string,
  payType: string,
  discountReasonId: string,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/order/payAndCheckPcOrder`, {
    checkType,
    id,
    payType,
    discountReasonId,
  });
}

/**
 * 获取当前场馆的的票务信息
 * @date 2022-01-10 16:26:37
 * @namespace SellTicketSpace
 * @param {String} venueId 场馆ID
 * @param {string} currentDate 选择的时间
 */
export async function getVenuePrice(
  venueId: string,
  currentDate: string,
): Promise<TypeUtil.RequestResult<SellTicketSpace.VenueTicketPriceItem[]>> {
  return get(`/venue-service/${version}/use/order/ticket/price/list`, { venueId, currentDate });
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
  return get(`/venue-service/${version}/cgs/venue/status/time`, { id: venueId, currentDate, type });
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
 * 获取按日期查询的票价列表
 * @param venueId
 * @param date
 */
export async function fetchVenueCurrentTicketPrice(
  venueId: string,
  date: string,
): Promise<TypeUtil.RequestResult> {
  return get(`/venue-service/${version}/use/order`, { venueId, currentDate: date });
}
