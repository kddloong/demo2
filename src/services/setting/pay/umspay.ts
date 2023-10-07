/**
 * 修改和配置云闪付支付参数配置
 *  @author yu
 * @date 2022-09-18 16:26:08
 */
import { get, post } from '@/services/request/request_tools';
import { TypeUtil } from 'types/utils';
import { UmspayConfig } from '../../../../types/setting/pay/umspay';
import { CLIENT_VERSION as version } from '@/utils/utils';

export async function handleSaveUmsPayConfig(
  values: UmspayConfig.UmspayConfigSetting,
): Promise<TypeUtil.RequestResult> {
  return post(`/third-service/${version}/third/china/ums/config/pay/save`, { ...values });
}

/**
 * 获取云闪付支付参数配置
 *  @author yu
 * @date 2022-09-18 16:29:22
 */

export async function handleGetUmsPayOrderConfig(): Promise<TypeUtil.RequestResult> {
  return get(`/third-service/${version}/third/china/ums/config/pay/info`, {});
}
