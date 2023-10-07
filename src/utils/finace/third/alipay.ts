import { message } from 'antd';
import { getAlipayFinanceOrderList } from '@/services/finance/third/alipay';
import { TypeUtil } from '../../../../types/utils';

/**
 * 阿里支付订单分页列表
 * @param params
 */
export const handleFetchAlipayFinanceOrderList = async (params: TypeUtil.RequestTableParams) => {
  try {
    const result = await getAlipayFinanceOrderList(params);
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
