import { TypeUtil } from '../../../../types/utils';
import { get } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { FinanceWxPay } from '../../../../types/finance/third/wxpay';

/**
 * 微信支付订单分页列表
 * @param params
 */
export async function getWxFinanceOrderList(
  params: TypeUtil.RequestTableParams,
): Promise<TypeUtil.RequestTableResult<FinanceWxPay.WxPayOrderInfo[]>> {
  return get(`/third-service/${version}/third/wechat/pay/order/list`, { ...params });
}
