import { get } from '@/services/request/request_tools';
import { TypeUtil } from 'types/utils';
import { CLIENT_VERSION as version } from '@/utils/utils';

/**
 * 支付接口返回USERPAYING,轮询支付状态
 * @param source
 * @param orderId
 */
export async function getPayingStatus(
  source: string,
  orderId: string,
): Promise<TypeUtil.RequestResult> {
  return get(`/venue-service/${version}/pay/order/back/order/pay/query/${source}/${orderId}`, {});
}
