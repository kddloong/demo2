/**
 * 处理配置支付宝支付操作
 * @date 2021-09-16 15:54:05
 *  @author yu
 */
import { message } from 'antd';
import { WeappSetting } from '../../../../types/setting/applets/wx-app';
import { fetchWxAppConfig, saveWxAppConfig } from '@/services/setting/applets/wx-app';

export const handleSaveWxAppSettings = async (values: WeappSetting.WeappSettingItem) => {
  const hide = message.loading('正在提交');

  try {
    const result = await saveWxAppConfig(values);

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
 * @date 2021-09-16 15:33:15
 * @author yu
 */

export const handleGetWxAppSettings = async () => {
  try {
    const result = await fetchWxAppConfig();

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
