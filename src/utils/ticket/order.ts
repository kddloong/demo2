import {
  backTicketDetailOrder,
  createTicketOrder,
  fetchTicketDetailOrder,
  payTicketDetailOrder,
} from '@/services/ticket/order';
import { CreateTicket } from 'types/order/createTicket';
import { message } from 'antd';
import { PayReverseOrder } from 'types/area/schedule';

/**
 * 创建售票订单
 * @date 2023-09-19
 * @param params
 */
export const handleCreateTicketOrder = async (params: CreateTicket.Ticket) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await createTicketOrder(params);

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
 * 获取售票订单子订单
 * @param detailId
 */
export const handleFetchTicketDetailOrder = async (detailId: string) => {
  try {
    const result = await fetchTicketDetailOrder(detailId);

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
 * 支付售票订单子订单
 * @date 2023-09-21
 * @param params
 */
export const handlePayTicketDetailOrder = async (params: PayReverseOrder.PayReverseOrderParams) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await payTicketDetailOrder(params);

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
 * 售票订单子订单退款
 * @param detailId
 * @param refundNum
 * @param refundPrice
 * @param refundReason
 */
export const handleBackTicketDetailOrder = async (
  detailId: string,
  refundNum: number,
  refundPrice: number,
  refundReason: string,
) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await backTicketDetailOrder(detailId, refundNum, refundPrice, refundReason);

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
