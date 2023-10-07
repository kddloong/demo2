import {
  backStartDetailOrder,
  backStartOrder,
  cancelStartOrder,
  createAreaStartOrder,
  fetchAreaStartOrderList,
  fetchStartDetailOrderInfo,
  getStartDetailList,
  payStartDetailOrder,
  payStartOrder,
} from '@/services/area/start';
import { PayStartOrder, VenueStartOrder } from 'types/area/start';
import { PAY_PAUSE } from '@/utils/utils';
import { message } from 'antd';
import { CreateStart } from 'types/order/createStart';
import { TypeUtil } from 'types/utils';

/**
 * 处理获取的开场订单
 * @date 2022-01-19 09:04:30
 * @param params
 * @returns {Promise<{total: number, code: number, data: *[], success: boolean}|{total, code, data, success}>}
 */
export const handleFetchAreaStartOrderList = async (params: TypeUtil.RequestTableParams) => {
  const hide = message.loading('正在获取数据！');

  try {
    const result = await fetchAreaStartOrderList(params);

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

/**
 * 处理创建 开场订单
 * @date 2022-06-27 13:08:57
 * @param data
 * @param hideMessage
 */
export const handleCreateAreaStartOrder = async (
  data: CreateStart.Start,
  hideMessage: boolean = false,
) => {
  const hide = message.loading('正在提交开场信息！');

  try {
    const result = await createAreaStartOrder(data);

    hide();

    if (result.success) {
      if (!hideMessage) {
        message.success(result.msg);
      }

      return {
        success: true,
        data: result.data,
      };
    } else {
      message.warning(result.msg);
      return {
        success: false,
        data: '',
      };
    }
  } catch (err) {
    hide();

    return {
      success: false,
      data: '',
    };
  }
};

/**
 * 开场订单的状态
 */
enum StartOrderStatusEnum {
  START_STATUS = '0',
  FINISH_STATUS = '1',
  CANCEL_STATUS = '2',
  BACK_STATUS = '5',
}

export { StartOrderStatusEnum };

/**
 * 处理获取的开场订单的子订单数据
 * @date 2022-01-19 09:12:59
 * @param id
 * @returns {Promise<{total: number, code: number, data: *[], success: boolean}|{total, code, data, success}>}
 */
export const handleStartDetailList = async (id: string) => {
  const hide = message.loading('正在获取数据！');

  try {
    const result = await getStartDetailList(id);

    hide();

    if (result.success) {
      return {
        data: result.data,
        success: result.success,
        code: result.code,
        total: (result.data as VenueStartOrder.VenueStartDetailOrderItem[]).length,
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

/**
 * 开场订单退款
 * @param orderId
 * @param refundNum
 * @param refundPrice
 * @param refundReason
 */
export const handleBackStartOrder = async (
  orderId: string,
  refundNum: number,
  refundPrice: number,
  refundReason: string,
) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await backStartOrder(orderId, refundNum, refundPrice, refundReason);

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
 * 完整开场订单的支付
 * @date 2022-03-17 09:29:53
 * @param data
 */
export const handlePayStartOrder = async (data: PayStartOrder.PayStartOrderParams) => {
  try {
    const result = await payStartOrder(data);

    if (result.success) {
      if (result.data?.wx_message !== PAY_PAUSE) {
        message.success(result.msg);
      }

      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: result.data };
    }
  } catch (err) {
    return { success: false, data: '' };
  }
};

/**
 * 开场订单状态
 * @date 2022-12-01
 */
export const startStatusObj = {
  [StartOrderStatusEnum.START_STATUS]: {
    label: '已开场',
    color: 'green',
  },
  [StartOrderStatusEnum.FINISH_STATUS]: {
    label: '已完成',
    color: 'blue',
  },
  [StartOrderStatusEnum.BACK_STATUS]: {
    label: '已退款',
    color: 'red',
  },
  [StartOrderStatusEnum.CANCEL_STATUS]: {
    label: '已取消',
    color: 'grey',
  },
};

/**
 * 开场订单的两种开场方式
 * @date 2023-09-15
 */
export class StartType {
  // 立即开场 '0'
  static START_IMMEDIATELY = '0';
  // 选择开场 '1';
  static CHOOSE_START = '1';
}

/**
 * 开场订单子订单状态
 */
export class StartDetailType {
  // 开场 '0'
  static START = '0';

  // 完成 '1'
  static FINISH = '1';
}

/**
 * 取消开场订单
 * @param orderId
 */
export const handleCancelStartOrder = async (orderId: string) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await cancelStartOrder(orderId);

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
 * 开场订单退款状态
 */
export class StartOrderRefundStatus {
  static NOT_BACK_PRICE = '0';

  static ALREADY_BACK_PRICE = '1';
}

/**
 * 获取开场订单子订单详情
 * @date 2023-09-20
 * @param orderDetailId
 */
export const handleFetchStartDetailOrderInfo = async (orderDetailId: string) => {
  try {
    const result = await fetchStartDetailOrderInfo(orderDetailId);

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
 * 开场订单子订单的支付
 * @date 2022-03-17 09:29:53
 * @param data
 */
export const handlePayStartDetailOrder = async (data: PayStartOrder.PayStartOrderParams) => {
  try {
    const result = await payStartDetailOrder(data);

    if (result.success) {
      if (result.data?.wx_message !== PAY_PAUSE) {
        message.success(result.msg);
      }

      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: result.data };
    }
  } catch (err) {
    return { success: false, data: '' };
  }
};

/**
 * 开场订单子订单退款
 * @param detailId
 * @param refundNum
 * @param refundPrice
 * @param refundReason
 */
export const handleBackStartDetailOrder = async (
  detailId: string,
  refundNum: number,
  refundPrice: number,
  refundReason: string,
) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await backStartDetailOrder(detailId, refundNum, refundPrice, refundReason);

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
