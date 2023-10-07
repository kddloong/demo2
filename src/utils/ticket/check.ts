import { message } from 'antd';
import { VenueCheck } from '../../../types/ticket/check';
import { getAreaCheckList } from '@/services/ticket/check';

/**
 * 处理获取的核销列表
 * @date 2022-01-21 16:14:56
 * @param params
 * @returns {Promise<{total: number, code: number, data: *[], success: boolean}|{total, code, data, success}>}
 */
export const handleAreaCheckList = async (params: VenueCheck.VenueCheckDataParams) => {
  const hide = message.loading('正在获取数据！');

  try {
    const result = await getAreaCheckList(params);

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
  } catch (err) {
    hide();

    return {};
  }
};
