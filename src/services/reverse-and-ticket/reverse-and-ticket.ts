import { TypeUtil } from 'types/utils';
import { get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { ReverseDetailOrder } from 'types/area/schedule';
import { UseOrder } from 'types/reverse-and-ticket/UseOrder';
import { TicketDetailOrder } from 'types/ticket/order';

/**
 * 获取售票订单和预定订单
 * @param params
 */
export async function fetchUseOrderList(
  params: TypeUtil.RequestTableParams,
): Promise<TypeUtil.RequestTableResult<UseOrder.UseOrderItem[]>> {
  return get(`/venue-service/${version}/use/order/list`, params);
}

/**
 * 获取售票订单或预定订单的子订单列表
 * @param id
 */
export async function fetchUseOrderDetailList(
  id: string,
): Promise<TypeUtil.RequestResult<ReverseDetailOrder.OrderItem[] | TicketDetailOrder.OrderItem[]>> {
  return get(`/venue-service/${version}/use/order/order/detail/list/${id}`);
}

/**
 * 取消预定订单或售票订单
 * @param id
 * @param cancelReason
 * @param cancelReasonId
 */
export async function cancelUseOrder(
  id: string,
  cancelReason: string = '',
  cancelReasonId: string = '',
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/order/saveCancelOrder`, {
    id,
    cancelReason,
    cancelReasonId,
  });
}

/**
 * 订单退款
 * @param id
 * @param refundNum
 * @param refundPrice
 * @param refundReason
 */
export async function backUseOrder(
  id: string,
  refundNum: number,
  refundPrice: number,
  refundReason: string,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/order/payBackOrder`, {
    id,
    refundNum,
    refundPrice,
    refundReason,
  });
}

/**
 * 获取售票订单或预定订单的详情, 包含主订单和子订单
 * @date 2023-09-22
 * @param id
 */
export async function fetchCompleteUseOrder(id: string): Promise<TypeUtil.RequestResult> {
  return get(`/venue-service/${version}/use/order/order/details/${id}`, {});
}
