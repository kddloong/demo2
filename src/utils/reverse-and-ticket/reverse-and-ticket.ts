import {TypeUtil} from 'types/utils';
import {message} from 'antd';
import {fetchUseOrderList,} from '@/services/reverse-and-ticket/reverse-and-ticket';
import {ProColumns} from '@ant-design/pro-components';
import {handleDictionary} from '@/utils/main/main/dictionary';

/**
 * 获取售卖订单和预定订单
 * @param params
 */
export const handleFetchUseOrderList = async (params: TypeUtil.RequestTableParams) => {
  try {
    const result = await fetchUseOrderList(params);

    if (result.success) {
      return {
        data: result.data,
        success: result.success,
        code: result.code,
        total: result.count,
      };
    } else {
      message.warning(result.msg);
      return { success: false, data: [] };
    }
  } catch (err) {
    return { success: false, data: [] };
  }
};



/**
 * 预定订单 及 售卖订单 的主订单的状态
 * 2023-01-03 删除待评价
 */
export const orderStatusFormSelect = (type: 'ticket' | 'reverse'): ProColumns => {
  return {
    title: '订单状态',
    dataIndex: 'status',
    key: 'status',
    hideInSearch: false,
    hideInTable: false,
    width: 80,
    valueType: 'select',
    request: async () => {
      const result = await handleDictionary('changguan_order_status');

      if (result && result.length > 0 && type === 'ticket') {
        return result.filter((item) => item.label !== '已核销');
      }

      return result;
    },
  }
};

