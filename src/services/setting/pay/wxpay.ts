import { get, post } from '@/services/request/request_tools';
import { WxpayConfig } from '../../../../types/setting/pay/wxpay';
import { TypeUtil } from 'types/utils';
import { CLIENT_VERSION as version } from '@/utils/utils';

/**
 * 修改和配置微信支付参数
 * @author yu
 * @date 2022-09-16 16:20:03
 */
export async function handleSaveWxPayConfig(
  values: WxpayConfig.WxpayConfigSetting,
): Promise<TypeUtil.RequestResult> {
  return post(`/third-service/${version}/third/wechat/config/pay/save`, { ...values });
}

/**
 * 获取微信支付参数配置
 *  @author yu
 * @date 2022-09-16 16:26:08
 */

export async function handleGetWxPayOrderConfig(): Promise<
  TypeUtil.RequestResult<WxpayConfig.WxpayConfigSetting>
> {
  return get(`/third-service/${version}/third/wechat/config/pay/info`, {});
}
