import { getDictionary } from '@/services/main/main/distionary';
import { LabelValueItem } from 'types/utils';
import { message } from 'antd';
import { payStatusEnum } from '@/utils/enums';
import { getPayingStatus } from '@/services/pay/pay';

/**
 * 2023-01-11 ticket-check2是特殊情况， 用于支付未支付订单
 */
export type OpenSource =
  | 'ticket'
  | 'area'
  | 'member'
  | 'ticket-check'
  | 'rent'
  | 'race'
  | 'sell'
  | 'lesson'
  | 'combo'
  | 'ticket-check2';

/**
 * 返回USERPAYING, 轮询调用接口的参数
 */
const getOpenSourceRef = {
  ticket: '7002',
  area: '7001',
  member: '7010',
  rent: '7021',
  sell: '7020',
  lesson: '7030',
  combo: '7031',
  race: '7040',
};

/**
 * 处理数据字典,获取付款方式
 * @returns {Promise<{}|{total, code, data, success}[]>}
 */
export const handleFetchPayTypeFromDictionary = async () => {
  try {
    const result = await getDictionary('changguan_pay_type');

    if (result.success) {
      return { success: result.success, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: result.success, data: [] as LabelValueItem[] };
    }
  } catch (err) {
    return { success: false, data: [] as LabelValueItem[] };
  }
};

export const payStatusObj = {
  [payStatusEnum.NOT_PAY]: {
    label: '未支付',
    color: 'red',
  },
  [payStatusEnum.ALREADY_PAY]: {
    label: '已支付',
    color: 'green',
  },
};

/**
 * 支付接口返回USERPAYING,轮询支付状态
 * @param source
 * @param orderId
 */
export const handleGetPayingStatus = async (source: OpenSource, orderId: string) => {
  try {
    const result = await getPayingStatus(
      getOpenSourceRef[source as keyof typeof getOpenSourceRef],
      orderId,
    );

    if (result.success) {
      message.success(result.msg);
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (err) {
    return { success: false };
  }
};

/**
 * 支付方式
 * @date 2023-09-15
 */
export class PayType {
  static CASH_PAY = '0';

  static MEMBER_CARD_PAY = '4';
}

export class RefundStatus {
  // 未退 '0'
  static UN_BACK = '0';
  // 已退 '1'
  static BACKED = '1';
}
