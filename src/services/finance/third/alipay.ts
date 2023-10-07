import { TypeUtil } from '../../../../types/utils';
import { get } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { FinanceAlipay } from '../../../../types/finance/third/alipay';

/**
 * 阿里支付订单分页列表
 * @param params
 */
export async function getAlipayFinanceOrderList(
  params: TypeUtil.RequestTableParams,
): Promise<TypeUtil.RequestTableResult<FinanceAlipay.AlipayOrderInfo[]>> {
  return get(`/third-service/${version}/third/ali/pay/order/list`, { ...params });
}
