import { VenueDeposit } from 'types/ticket/deposit';
import { message } from 'antd';
import { getAreaDepositList } from '@/services/ticket/deposit';

/**
 * 处理获取的押金列表
 * @date 2022-01-21 16:14:56
 * @param params
 * @returns {Promise<{total: number, code: number, data: *[], success: boolean}|{total, code, data, success}>}
 */
export const handleAreaDepositList = async (params: VenueDeposit.VenueDepositDataParams) => {
  const hide = message.loading('正在获取数据！');

  try {
    const result = await getAreaDepositList(params);

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
