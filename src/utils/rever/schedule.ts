import { message } from 'antd';
import {
  backReverseDetailOrder,
  cancelOrderReverse,
  cancelOrderReverse2,
  cancelTicketOrderReverse2,
  changeUseOrderStatusFromReverseToStart,
  checkDetailOrder,
  checkReverseOrderByOrderCode,
  checkScheduleOrder,
  createReverseOrder,
  fetchOrderInfoByOrderCode,
  fetchReverseDetailOrder,
  fetchUseOrderByOrderNo,
  getScheduleOrderInfo,
  payReverseDetailOrder,
  payReverseOrder,
} from '@/services/rever/schedule';
import { AreaScheduleBackParams } from 'types/main/main/area';
import { TypeUtil } from 'types/utils';
import { CreateReverse } from 'types/order/createReverse';
import { PayReverseOrder } from '../../../types/rever/schedule';

/**
 * 保存创建预定订单
 * @date 2023-09-15
 * @param params
 */
export const handleCreateReverseOrder = async (params: CreateReverse.Reverse) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await createReverseOrder(params);

    hide();

    if (result.success) {
      message.success(result.msg);
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: '' };
    }
  } catch (err) {
    hide();

    return { success: false, data: '' };
  }
};

/**
 * 处理取消预定操作
 * @param orderNo
 * @param cancelReason
 * @param cancelReasonId
 * @param price
 * @param refundReason
 * @returns {Promise<boolean>}
 */
export const handleCancelOrderReverse = async (
  orderNo: string,
  cancelReason: string,
  cancelReasonId: string,
  price: number,
) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await cancelOrderReverse(orderNo, cancelReason, cancelReasonId, price);

    hide();

    if (result.success) {
      message.success(result.msg);
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

/**
 * 处理取消预定操作
 * @returns {Promise<boolean>}
 * @param data
 */
export const handleCancelOrderReverse2 = async (data: AreaScheduleBackParams) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await cancelOrderReverse2(data);

    hide();

    if (result.success) {
      message.success(result.msg);
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

/**
 * 处理取消预定操作
 * @returns {Promise<boolean>}
 * @param data
 */
export const handleCancelTicketOrderReverse2 = async (data: { id: string }) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await cancelTicketOrderReverse2(data);

    hide();

    if (result.success) {
      message.success(result.msg);
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

/**
 * 处理获取的预定订单的信息
 * @date 2022-10-10
 * @param id
 * @namespace BookOrder
 */
export const handleFetchReverseOrderInfo = async (id: string) => {
  try {
    const result = await getScheduleOrderInfo(id);

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
 * 处理预定订单一键核销订单
 * @param id
 * @param checkType
 */
export const handleCheckOrder = async (
  id: string,
  checkType: string,
  hideMessage: boolean = false,
) => {
  const hide = hideMessage
    ? () => {
        return () => {};
      }
    : message.loading('正在提交！');

  try {
    const result = await checkScheduleOrder(id, checkType);

    hide();

    if (result.success) {
      if (!hideMessage) {
        message.success(result.msg);
      }

      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

/**
 * 用于售卖事务-订单管理, 核销订单
 * @param orderCode - 核销码
 * @param hideMessage
 */
export const handleCheckReverseOrderByOrderCode = async (
  orderCode: string,
  hideMessage: boolean = false,
) => {
  const hide = hideMessage
    ? () => {
        return () => {};
      }
    : message.loading('正在提交！');

  console.log(`核销了`);

  try {
    const result = await checkReverseOrderByOrderCode(orderCode);

    hide();

    if (result.success) {
      if (!hideMessage) {
        message.success(result.msg);
      }

      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

/**
 * 预定订单处理核销单个订单
 * @param detailId
 * @param orderItem 0 是 预定, 2是售卖
 */
export const handleCheckDetailOrder = async (detailId: string, orderItem: string) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await checkDetailOrder(detailId, orderItem);

    hide();

    if (result.success) {
      message.success(result.msg);
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

/**
 * 处理 预定订单转开场
 * @param data
 * @oaram data.id 预定订单id
 */
export const handleChangeUseOrderStatusFromReverseToStart = async (
  data: TypeUtil.BaseOrderParams,
) => {
  const hide = message.loading('正在开场！');

  try {
    const result = await changeUseOrderStatusFromReverseToStart(data);

    hide();

    if (result.success) {
      message.success(result.msg);
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

/**
 * 获取预定订单（预定， 售卖）订单信息
 * @param orderNo
 */
export const handleFetchUseOrderByOrderNo = async (orderNo: string) => {
  try {
    const result = await fetchUseOrderByOrderNo(orderNo);

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
 * 通过订单核销码获取订单信息
 * @param orderCode
 */
export const handleFetchOrderInfoByOrderCode = async (orderCode: string) => {
  try {
    const result = await fetchOrderInfoByOrderCode(orderCode);

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: {} };
    }
  } catch (err) {
    return { success: false, data: {} };
  }
};

/**
 * 支付预定订单
 * @date 2023-09-18
 * @param params
 */
export const handlePayReverseOrder = async (params: PayReverseOrder.PayReverseOrderParams) => {
  try {
    const result = await payReverseOrder(params);

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: '' };
    }
  } catch (err) {
    return { success: false, data: '' };
  }
};

/**
 * 获取预定订单子订单详情
 * @date 2023-09-20
 * @param detailId
 */
export const handleFetchReverseDetailOrder = async (detailId: string) => {
  try {
    const result = await fetchReverseDetailOrder(detailId);

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
 * 支付预定订单子订单
 * @date 2023-09-18
 * @param params
 */
export const handlePayReverseDetailOrder = async (
  params: PayReverseOrder.PayReverseOrderParams,
) => {
  try {
    const result = await payReverseDetailOrder(params);

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: '' };
    }
  } catch (err) {
    return { success: false, data: '' };
  }
};

/**
 * 预定订单子订单退款
 * @param detailId
 * @param refundNum
 * @param refundPrice
 * @param refundReason
 */
export const handleBackReverseDetailOrder = async (
  detailId: string,
  refundNum: number,
  refundPrice: number,
  refundReason: string,
) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await backReverseDetailOrder(detailId, refundNum, refundPrice, refundReason);

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
