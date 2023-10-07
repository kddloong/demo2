import { get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { AreaStart, PayStartOrder, VenueStartOrder } from 'types/area/start';
import { PayResult, TypeUtil } from 'types/utils';
import { CreateStart } from 'types/order/createStart';

/**
 * 获取开场订单列表
 * @date 2023-09-15
 * @param params
 */
export async function fetchAreaStartOrderList(
  params: TypeUtil.RequestTableParams,
): Promise<TypeUtil.RequestTableResult<AreaStart.AreaStartItem[]>> {
  return get(`/venue-service/${version}/use/use/order/list`, params);
}

/**
 * @date 2022-06-27 11:37:17
 * 创建 开场订单
 * @param data
 */
export async function createAreaStartOrder(
  data: CreateStart.Start,
): Promise<TypeUtil.RequestResult<string>> {
  return post(`/venue-service/${version}/use/use/saveUseOrder`, data);
}

/**
 * 获取开场订单的子订单
 * @date 2022-01-18 21:30:56
 * @param id
 */
export async function getStartDetailList(
  id: string,
): Promise<TypeUtil.RequestResult<VenueStartOrder.VenueStartDetailOrderItem[]>> {
  return get(`/venue-service/${version}/use/use/order/detail/list/${id}`);
}

/**
 * 开场订单退款
 * @param orderId
 * @param refundNum
 * @param refundPrice
 * @param refundReason
 */
export async function backStartOrder(
  orderId: string,
  refundNum: number,
  refundPrice: number,
  refundReason: string,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/use/payBackOrder`, {
    id: orderId,
    refundNum,
    refundPrice,
    refundReason,
  });
}

/**
 * 完整开场订单的支付
 * @date 2022-03-17 09:29:22
 * @param data
 */
export async function payStartOrder(
  data: PayStartOrder.PayStartOrderParams,
): Promise<TypeUtil.RequestResult<PayResult>> {
  return post(`/venue-service/${version}/use/use/payUseOrder`, data);
}

/**
 * 取消开场订单
 * @param orderId
 */
export async function cancelStartOrder(orderId: string): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/use/cancelOrder`, { id: orderId });
}

/**
 * 获取开场订单子订单信息
 * @param detailOrderId 子订单id
 */
export async function fetchStartDetailOrderInfo(
  detailOrderId: string,
): Promise<TypeUtil.RequestResult> {
  return get(`/venue-service/${version}/use/use/order/detail/${detailOrderId}`, {});
}

/**
 * 开场订单子订单的支付
 * @param params
 */
export async function payStartDetailOrder(
  params: PayStartOrder.PayStartOrderParams,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/use/payUseOrderDetail`, params);
}

/**
 * 开场订单子订单退款
 * @param detailId
 * @param refundNum
 * @param refundPrice
 * @param refundReason
 */
export async function backStartDetailOrder(
  detailId: string,
  refundNum: number,
  refundPrice: number,
  refundReason: string,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/use/payBackOrderDetail`, {
    detailId,
    refundNum,
    refundPrice,
    refundReason,
  });
}
