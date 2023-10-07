import { message } from 'antd';
import { TypeUtil } from '../../../../types/utils';
import { getWxFinanceOrderList } from '@/services/finance/third/wxpay';

/**
 * 微信支付订单分页列表
 * @param params
 */
export const handleFetchWxFinanceOrderList = async (params: TypeUtil.RequestTableParams) => {
  try {
    const result = await getWxFinanceOrderList(params);
    if (result.success) {
      return {
        success: true,
        data: result.data,
        total: result.count,
      };
    } else {
      message.warning(result.msg);
      return {
        success: false,
        data: [],
      };
    }
  } catch (err) {
    return {
      success: false,
      data: [],
    };
  }
};
