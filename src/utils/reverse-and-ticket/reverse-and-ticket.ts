import { TypeUtil } from 'types/utils';
import { message } from 'antd';
import {
  backUseOrder,
  cancelUseOrder,
  fetchCompleteUseOrder,
  fetchUseOrderDetailList,
  fetchUseOrderList,
} from '@/services/reverse-and-ticket/reverse-and-ticket';
import { ProColumns } from '@ant-design/pro-components';
import { handleDictionary } from '@/utils/main/main/dictionary';
import { USE_ORDER } from '@/utils/ticket-and-reverse';
import { tagRender } from '@/utils/render';

/**
 * 获取售票订单和预定订单
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
 * 获取售票订单或预定订单的子订单
 * @param id
 */
export const handleFetchUseOrderDetailList = async (id: string) => {
  try {
    const result = await fetchUseOrderDetailList(id);

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: [] };
    }
  } catch (err) {
    return { success: false, data: [] };
  }
};

/**
 * 取消预定订单 或 售票订单
 * @param id
 */
export const handleCancelUseOrder = async (id: string) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await cancelUseOrder(id);

    hide();

    if (result.success) {
      message.success(result.msg);
      return { success: true };
    } else {
      message.warning(result.msg);
      return { success: false };
    }
  } catch (err) {
    hide();

    return { success: false };
  }
};

/**
 * 预定或售票主订单退款
 * @param id
 * @param refundNum
 * @param refundPrice
 * @param refundReason
 */
export const handleBackUseOrder = async (
  id: string,
  refundNum: number,
  refundPrice: number,
  refundReason: string,
) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await backUseOrder(id, refundNum, refundPrice, refundReason);

    hide();

    if (result.success) {
      message.success(result.msg);
      return { success: true };
    } else {
      message.warning(result.msg);
      return { success: false };
    }
  } catch (err) {
    hide();

    return { success: false };
  }
};

/**
 * 预定订单 及 售票订单 的主订单的状态
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
    render: (text, record) => {
      if (['0', '1', '5', '6', '3'].includes(record.status)) {
        let note = '';
        switch (record.status) {
          case USE_ORDER.WILL_VERIFY_STATUS:
            note = '待核销';
            break;
          case USE_ORDER.WILL_PAY_STATUS:
            note = '待付款';
            break;

          case USE_ORDER.FINISH_STATUS:
            note = '已完成';
            break;
          default:
            note = '';
        }

        if (record.status === USE_ORDER.VERIFIED_STATUS && type !== 'ticket') {
          return tagRender('green', '已核销');
        }

        return tagRender('green', note);
      } else if (['2', '4'].includes(record.status)) {
        let note = '';
        switch (record.status) {
          case USE_ORDER.CANCEL_STATUS:
            note = '已取消';
            break;
          case USE_ORDER.BACK_PRICE_STATUS:
            note = '已退款';
            break;

          default:
            note = '';
        }
        return tagRender('red', note);
      } else {
        return tagRender('blue', '已核销');
      }
    },
  };
};

/**
 * 获取售票订单或预定订单的详情, 包含主订单和子订单
 * @date 2023-09-22
 * @param id
 */
export const handleFetchCompleteUseOrder = async (id: string) => {
  try {
    const result = await fetchCompleteUseOrder(id);

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
