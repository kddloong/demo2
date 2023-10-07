import { get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { TypeUtil } from 'types/utils';
import { BookOrder } from 'types/ticket/workplace';
import { AreaScheduleBackParams } from 'types/main/main/area';
import { CreateReverse } from 'types/order/createReverse';
import { PayReverseOrder } from '../../../types/area/schedule';

/**
 * 保存创建预定订单
 * @date 2023-09-15
 * @param params
 */
export async function createReverseOrder(
  params: CreateReverse.Reverse,
): Promise<TypeUtil.RequestResult<string>> {
  return post(`/venue-service/${version}/use/order/createBookOrder`, params);
}

/**
 * 取消预定订单
 * @param orderNo
 * @param cancelReason
 * @param cancelReasonId
 * @param price
 * @returns {Promise<unknown>}
 */
export async function cancelOrderReverse(
  orderNo: string,
  cancelReason: string,
  cancelReasonId: string,
  price: number,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/order/saveCancelBookOrder`, {
    orderNo,
    cancelReason,
    cancelReasonId,
    price,
  });
}

/**
 * 取消预定订单
 * @returns {Promise<unknown>}
 * @param params
 */
export async function cancelOrderReverse2(
  params: AreaScheduleBackParams,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/order/saveCancelBookOrder`, params);
}

/**
 * 取消售票订单
 * @returns {Promise<unknown>}
 * @param params
 */
export async function cancelTicketOrderReverse2(params: {
  id: string;
}): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/order/cancelOrder`, params);
}

/**
 * 获取预定订单的数据
 * @date 2022-03-21 11:07:47
 * @param id
 * @namespace BookOrder
 */
export async function getScheduleOrderInfo(
  id: string,
): Promise<TypeUtil.RequestResult<BookOrder.BookOrderItem>> {
  return get(`/venue-service/${version}/use/order/order/${id}`);
}

/**
 * 预定订单一键核销预定订单
 * @param id
 * @param checkType
 */
export async function checkScheduleOrder(
  id: string,
  checkType: string,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/order/checkOrder`, { id, checkType });
}

/**
 * 用于售票事务-订单管理, 核销订单
 * @param orderCode - 核销码
 */
export async function checkReverseOrderByOrderCode(
  orderCode: string,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/order/checkOrderByTicketCode`, { orderCode });
}

/**
 * 预定订单核销单个订单
 * @date 2022-04-14 10:29:08
 * @param detailId
 * @param orderItem 0 是 场地, 2是售票
 */
export async function checkDetailOrder(
  detailId: string,
  orderItem: string,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/order/checkDetailOrder`, {
    detailId,
    orderItem,
  });
}

/**
 * 预定订单 转 开场
 * @param {object} data
 * @param {string} data.id 订单id
 */
export async function changeUseOrderStatusFromReverseToStart(
  data: TypeUtil.BaseOrderParams,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/order/savePcBookOrderToUse`, data);
}

/**
 * 获取预定订单 (预定, 售票)的订单信息
 * @date 2023-09-19
 * @param orderNo
 */
export async function fetchUseOrderByOrderNo(
  orderNo: string,
): Promise<TypeUtil.RequestResult<BookOrder.BookOrderItem>> {
  return get(`/venue-service/${version}/use/order/order/byOrderNo/${orderNo}`, {});
}

/**
 * 通过核销码查询订单信息
 * @param orderCode
 */
export async function fetchOrderInfoByOrderCode(
  orderCode: string,
): Promise<TypeUtil.RequestResult<BookOrder.BookOrderItem>> {
  return get(`/venue-service/${version}/use/order/getOrderByOrderCode`, { orderCode });
}

/**
 * 支付预定订单
 * @date 2023-09-21
 * @param params
 */
export async function payReverseOrder(
  params: PayReverseOrder.PayReverseOrderParams,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/order/payOrder`, params);
}

/**
 * 获取子订单详情
 * @param detailId
 */
export async function fetchReverseDetailOrder(detailId: string): Promise<TypeUtil.RequestResult> {
  return get(`/venue-service/${version}/use/order/book/order/detail/${detailId}`, {});
}

/**
 * 预定订单子订单支付
 * @param params
 */
export async function payReverseDetailOrder(
  params: PayReverseOrder.PayReverseOrderParams,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/order/payBookOrderDetail`, params);
}

/**
 * 预定订单子订单退款
 * @param detailId
 * @param refundNum
 * @param refundPrice
 * @param refundReason
 */
export async function backReverseDetailOrder(
  detailId: string,
  refundNum: number,
  refundPrice: number,
  refundReason: string,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/order/payBackBookOrderDetail`, {
    detailId,
    refundNum,
    refundPrice,
    refundReason,
  });
}
