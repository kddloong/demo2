/**
 * 处理配置支付宝支付操作
 * @date 2022-09-16 15:54:05
 *  @author yu
 */

import { message } from 'antd';
import { AlipayConfig } from '../../../../types/setting/pay/alipay';
import { getAliPayOrderConfig, saveAliPayConfig } from '@/services/setting/pay/alipay';

export const handleSaveAliPaySettings = async (values: AlipayConfig.AlipayConfigSetting) => {
  const hide = message.loading('正在提交');

  try {
    const result = await saveAliPayConfig(values);

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
 * 处理获取支付宝支付操作
 * @date 2022-09-16 15:33:15
 *  @author yu
 */

export const handleGetAliPayOrderSettings = async () => {
  try {
    const result = await getAliPayOrderConfig();

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
