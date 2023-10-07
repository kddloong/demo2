import { message } from 'antd';
import { fetchCutCountList } from '@/services/member/list/cut-count';
import { RequestTableParam } from 'types/utils';

/**
 * 处理获取的数据
 * @date 2021.12.26
 * @param params
 * @returns {Promise<{total: number, code: number, data: *[], success: boolean}|{total, code, data, success}>}
 */
export const handleCutCountList = async (params: RequestTableParam) => {
  const hide = message.loading('正在获取数据');

  try {
    const result = await fetchCutCountList(params);

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

export const consumptionTypeOptions = [
  {
    label: '开场订单',
    value: '0',
  },
  {
    label: '预定订单',
    value: '1',
  },
  {
    label: '商品购买',
    value: '2',
  },
  {
    label: '商品租赁',
    value: '3',
  },
];
