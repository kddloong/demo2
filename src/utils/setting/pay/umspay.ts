/**
 * 处理配置云闪付支付操作
 * @date 2022-09-18 15:54:05
 *  @author yu
 */

import { message } from 'antd';
import { handleGetUmsPayOrderConfig, handleSaveUmsPayConfig } from '@/services/setting/pay/umspay';
import { UmspayConfig } from '../../../../types/setting/pay/umspay';

export const handleSaveUmsPaySettings = async (values: UmspayConfig.UmspayConfigSetting) => {
  const hide = message.loading('正在提交');

  try {
    const result = await handleSaveUmsPayConfig(values);

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
 * 处理获取云闪付支付操作
 * @date 2022-09-18 15:33:15
 *  @author yu
 */

export const handleGetUmsPayOrderSettings = async () => {
  try {
    const result = await handleGetUmsPayOrderConfig();

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
