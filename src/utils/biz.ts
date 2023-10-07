import { fetchBizInfo } from '@/services/biz';
import { message } from 'antd';

/**
 * 获取当前场馆的企业信息
 * @param id
 */
export const handleFetchBizInfo = async (id: string) => {
  try {
    const result = await fetchBizInfo(id);

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
