import { PayReverseOrder } from 'types/area/schedule';
import { handlePayReverseDetailOrder, handlePayReverseOrder } from '@/utils/area/schedule';
import { handlePayTicketDetailOrder } from '@/utils/ticket/order';
import { modalConfirm } from '@/utils/model-confirm';
import { PayType } from '@/utils/pay/pay';

/**
 * 执行支付预定订单或售票订单主订单的操作
 * @param payParams
 * @param successCallback
 * @param failCallback
 */
export const executePayReverse = async (
  payParams: PayReverseOrder.PayReverseOrderParams,
  successCallback: () => void,
  failCallback: () => void,
) => {
  const { payType } = payParams;

  if (payType === PayType.CASH_PAY) {
    await modalConfirm('支付', '是否确认已支付?', async () => {
      const payResult = await handlePayReverseOrder(payParams);

      if (payResult.success) {
        successCallback();
      } else {
        failCallback();
      }
    });
  } else {
    const payResult = await handlePayReverseOrder(payParams);

    if (payResult.success) {
      successCallback();
    } else {
      failCallback();
    }
  }
};

/**
 * 执行支付预定订单子订单的操作
 * @param payParams
 * @param successCallback
 * @param failCallback
 */
export const executePayReverseDetail = async (
  payParams: PayReverseOrder.PayReverseOrderParams,
  successCallback: () => void,
  failCallback: () => void,
) => {
  const { payType } = payParams;

  if (payType === PayType.CASH_PAY) {
    await modalConfirm('支付', '是否确认已支付?', async () => {
      const payResult = await handlePayReverseDetailOrder(payParams);

      if (payResult.success) {
        successCallback();
      } else {
        failCallback();
      }
    });
  } else {
    const payResult = await handlePayReverseDetailOrder(payParams);

    if (payResult.success) {
      successCallback();
    } else {
      failCallback();
    }
  }
};

/**
 * 执行支付售票订单子订单的操作
 * @param payParams
 * @param successCallback
 * @param failCallback
 */
export const executePayTicketDetail = async (
  payParams: PayReverseOrder.PayReverseOrderParams,
  successCallback: () => void,
  failCallback: () => void,
) => {
  const { payType } = payParams;

  if (payType === PayType.CASH_PAY) {
    await modalConfirm('支付', '是否确认已支付?', async () => {
      const payResult = await handlePayTicketDetailOrder(payParams);

      if (payResult.success) {
        successCallback();
      } else {
        failCallback();
      }
    });
  } else {
    const payResult = await handlePayTicketDetailOrder(payParams);

    if (payResult.success) {
      successCallback();
    } else {
      failCallback();
    }
  }
};
