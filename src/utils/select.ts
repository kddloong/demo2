import { fetchSelectData } from '@/services/select';
import { message } from 'antd';

export const handleFetchSelectData = async (url: string, params: Record<string, string> = {}) => {
  try {
    const result = await fetchSelectData(url, params);

    if (result.success) {
      return { success: true, data: result.data || [] };
    } else {
      message.warning(result.msg);

      if (ENVIRONMENT === 'development') {
        message.warning(url);
      }

      return { success: false, data: [] };
    }
  } catch (err) {
    return { success: false, data: [] };
  }
};
