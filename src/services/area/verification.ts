import { get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { TypeUtil } from 'types/utils';
import { VenueCode } from '../../../types/area/verification';

/**
 * 核销， 根据code获取订单信息
 * @param code
 * // todo 有点怪
 */
export async function getOrderByCode(
  code: string,
): Promise<TypeUtil.RequestTableResult<VenueCode.VenueCodeItem>> {
  return get(`/venue-service/${version}/use/order/orderByCode`, { code });
}

/**
 * 核销， 根据code获取售票订单信息
 * @param orderCode
 * // todo 有点怪
 * @param source
 */
export async function fetchTicketDetailOrderByCode(
  orderCode: string,
  source: 'Ticket' | 'Book',
): Promise<TypeUtil.RequestTableResult<VenueCode.VenueCodeItem>> {
  return post(`/venue-service/${version}/use/order/checkOrderBy${source}Code`, { orderCode });
}
