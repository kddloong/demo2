import { CLIENT_VERSION as version } from '@/utils/utils';
import { AlipayConfig } from '../../../../types/setting/pay/alipay';
import { get, post } from '@/services/request/request_tools';
import { TypeUtil } from 'types/utils';

/**
 * 修改和配置支付宝支付参数配置
 *  @author yu
 * @date 2022-09-16 16:26:08
 */

export async function saveAliPayConfig(
  values: AlipayConfig.AlipayConfigSetting,
): Promise<TypeUtil.RequestResult> {
  return post(`/third-service/${version}/third/ali/config/pay/save`, { ...values });
}

/**
 * 获取支付宝支付参数配置
 *  @author yu
 * @date 2022-09-16 16:29:22
 */

export async function getAliPayOrderConfig(): Promise<TypeUtil.RequestResult> {
  return get(`/third-service/${version}/third/ali/config/pay/info`, {});
}
