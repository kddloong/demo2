/**
 * 处理配置微信支付操作
 * @date 2022-09-16 15:54:05
 *  @author yu
 */

import { message } from 'antd';
import { handleGetWxPayOrderConfig, handleSaveWxPayConfig } from '@/services/setting/pay/wxpay';
import { WxpayConfig } from '../../../../types/setting/pay/wxpay';

export const handleSaveWxPaySettings = async (values: WxpayConfig.WxpayConfigSetting) => {
  const hide = message.loading('正在提交');

  try {
    const result = await handleSaveWxPayConfig(values);

    hide();

    if (result.success) {
      message.success(result.msg);
      return { success: true, data: {} };
    } else {
      message.warning(result.msg);
      return { success: false, data: {} };
    }
  } catch (err) {
    hide();

    return { success: false, data: {} };
  }
};

/**
 * 处理获取微信支付操作
 * @date 2022-09-16 15:54:05
 *  @author yu
 */

export const handleGetWxPayOrderSettings = async () => {
  try {
    const result = await handleGetWxPayOrderConfig();

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: {} };
    }
  } catch (err) {
    return { success: false, data: {} };
  }
};
