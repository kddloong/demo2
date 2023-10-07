import { fetchAlertByCode } from '@/services/getAlertByCode';
import { message } from 'antd';

/**
 * 根据code获取页面配置信息
 * @param code
 */
export const handleFetchAlertByCode = async (code: string) => {
  try {
    const result = await fetchAlertByCode(code);

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: null };
    }
  } catch (err) {
    return { success: false, data: null };
  }
};
