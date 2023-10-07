import { message } from 'antd';
import {
  backMemberOrder,
  cancelOrder,
  fetchMemberOrderInfoById,
  fetchOrderList,
} from '@/services/member/member/order';
import { RequestTableParam } from 'types/utils';
import { MemberOrderStatusEnum } from '@/utils/enums';

/**
 * 处理获取的数据
 * @date 2021.12.26
 * @param params
 * @returns {Promise<{total: number, code: number, data: *[], success: boolean}|{total, code, data, success}>}
 */
export const handleOrderList = async (params: RequestTableParam) => {
  const hide = message.loading('正在获取数据');

  try {
    const result = await fetchOrderList(params);

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

/**
 * 根据id获取会员订单信息
 * @param orderId
 */
export const handleFetchMemberOrderInfoById = async (orderId: string) => {
  try {
    const result = await fetchMemberOrderInfoById(orderId);

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

/**
 * 会员订单退款
 * @param orderNo
 * @param price
 * @param refundReason
 */
export const handleBackMemberOrder = async (
  orderNo: string,
  price: number,
  refundReason: string,
) => {
  const hide = message.loading('正在退款！');

  try {
    const result = await backMemberOrder(orderNo, price, refundReason);

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
 * 取消会员订单
 * @param id
 */
export const handleCancelOrder = async (id: string) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await cancelOrder(id);

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

export const memberOrderStatusObj = {
  [MemberOrderStatusEnum.CREATE]: {
    label: '创建订单',
    color: 'green',
  },
  [MemberOrderStatusEnum.ALREADY_PAY]: {
    label: '已支付',
    color: 'blue',
  },
  [MemberOrderStatusEnum.BACK_PRICE]: {
    label: '已退款',
    color: 'red',
  },
  [MemberOrderStatusEnum.CANCEL]: {
    label: '已取消',
    color: 'grey',
  },
};
