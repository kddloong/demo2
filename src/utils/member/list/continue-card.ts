import { message } from 'antd';
import { RequestTableParam } from 'types/utils';
import { fetchContinueCardList } from '@/services/member/list/continue-card';

/**
 * 处理获取的数据
 * @date 2021.12.26
 * @param params
 * @returns {Promise<{total: number, code: number, data: *[], success: boolean}|{total, code, data, success}>}
 */
export const handleContinueCardList = async (params: RequestTableParam) => {
  const hide = message.loading('正在获取数据');

  try {
    const result = await fetchContinueCardList(params);

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
      return {};
    }
  } catch (e) {
    return {};
  }
};
