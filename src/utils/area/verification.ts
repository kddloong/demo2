import { message } from 'antd';
import { fetchTicketDetailOrderByCode, getOrderByCode } from '@/services/area/verification';

/**
 * 处理核销操作时， 根据code获取订单信息
 * @date 2022-03-21 14:31:26
 * @param code
 */
export const handleGetOrderByCode = async (code: string) => {
  try {
    const result = await getOrderByCode(code);

    if (result.success) {
      return result.data;
    } else {
      message.warning(result.msg);
      return {};
    }
  } catch (err) {
    return {};
  }
};

/**
 * 获取售票订单的核销信息
 * @param code
 * @param source
 */
export const handleFetchTicketDetailOrderByCode = async (
  code: string,
  source: 'Ticket' | 'Book',
) => {
  try {
    const result = await fetchTicketDetailOrderByCode(code, source);

    if (result.success) {
      message.success(result.msg);
      return { success: result.success, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: {} };
    }
  } catch (err) {
    return { success: false, data: {} };
  }
};
