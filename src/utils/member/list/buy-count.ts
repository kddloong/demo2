import { message } from 'antd';
import { fetchBuyCountList } from '@/services/member/list/buy-count';
import { RequestTableParam } from 'types/utils';

/**
 * 处理获取的数据
 * @date 2021.12.26
 * @param params
 * @returns {Promise<{total: number, code: number, data: *[], success: boolean}|{total, code, data, success}>}
 */
export const handleBuyCountList = async (params: RequestTableParam) => {
  const hide = message.loading('正在获取数据');

  try {
    const result = await fetchBuyCountList(params);

    hide();

    if (result.success) {
      return {
        data: result.data,
        success: result.success,
        code: result.code,
        total: result.count,
      };
    } else {
      message.warning(result.msg);
      return {
        data: [],
        success: result.success,
      };
    }
  } catch (e) {
    return {
      data: [],
      success: false,
    };
  }
};
