import { get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { RequestTableParam, TypeUtil } from 'types/utils';

/**
 * 获取充值记录列表
 * @date 2022-07-28
 * @param params
 * @returns {Promise<unknown>}
 */
export async function fetchOrderList(
  params: RequestTableParam,
): Promise<TypeUtil.RequestTableResult<MemberOrder.OrderListItem[]>> {
  return get(`/venue-service/${version}/mem/order/list`, params);
}

/**
 * 根据充值订单id获取订单记录
 * @param orderId
 */
export async function fetchMemberOrderInfoById(
  orderId: string,
): Promise<TypeUtil.RequestResult<MemberOrder.MemberOrderItem>> {
  return get(`/venue-service/${version}/mem/order/${orderId}`, {});
}

/**
 * 会员卡订单退款
 * @param orderNo
 * @param price
 * @param refundReason
 */
export async function backMemberOrder(
  orderNo: string,
  price: number,
  refundReason: string,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/mem/member/payBackOrder`, {
    orderNo,
    price,
    refundReason,
  });
}

/**
 * 取消会员订单
 * @param id
 */
export async function cancelOrder(id: string): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/mem/order/cancelOrder`, { id });
}
