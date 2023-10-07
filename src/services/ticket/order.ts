import { CreateTicket } from 'types/order/createTicket';
import { TypeUtil } from 'types/utils';
import { get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { PayReverseOrder } from 'types/area/schedule';

/**
 * 创建售票订单
 * @date 2023-09-21
 * @param params
 */
export async function createTicketOrder(
  params: CreateTicket.Ticket,
): Promise<TypeUtil.RequestResult<string>> {
  return post(`/venue-service/${version}/use/order/createTicketOrder`, params);
}

/**
 * 获取售票订单子订单详情
 * @date 2023-09-21
 * @param detailId
 */
export async function fetchTicketDetailOrder(detailId: string): Promise<TypeUtil.RequestResult> {
  return get(`/venue-service/${version}/use/order/ticket/order/detail/${detailId}`, {});
}

/**
 * 支付售票订单子订单
 * @date 2023-09-21
 * @param params
 */
export async function payTicketDetailOrder(
  params: PayReverseOrder.PayReverseOrderParams,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/order/payTicketOrderDetail`, params);
}

/**
 * 售票订单子订单退款
 * @param detailId
 * @param refundNum
 * @param refundPrice
 * @param refundReason
 */
export async function backTicketDetailOrder(
  detailId: string,
  refundNum: number,
  refundPrice: number,
  refundReason: string,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/order/payBackTicketOrderDetail`, {
    detailId,
    refundNum,
    refundPrice,
    refundReason,
  });
}
