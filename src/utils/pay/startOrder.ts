import { PayStartOrder } from 'types/area/start';
import { handlePayStartDetailOrder, handlePayStartOrder } from '@/utils/area/start';
import { PayType } from '@/utils/pay/pay';
import { modalConfirm } from '@/utils/model-confirm';

/**
 * 执行支付开场订单的操作
 * @param payParams
 * @param successCallback
 * @param failCallback
 */
export const executePayStart = async (
  payParams: PayStartOrder.PayStartOrderParams,
  successCallback: () => void,
  failCallback: () => void,
) => {
  const { payType } = payParams;

  if (payType === PayType.CASH_PAY) {
    await modalConfirm('支付', '是否确认已支付?', async () => {
      const payResult = await handlePayStartOrder(payParams);

      if (payResult.success) {
        successCallback();
      } else {
        failCallback();
      }
    });
  } else {
    const payResult = await handlePayStartOrder(payParams);

    if (payResult.success) {
      successCallback();
    } else {
      failCallback();
    }
  }
};

/**
 * 执行支付开场订单的操作
 * @param payParams
 * @param successCallback
 * @param failCallback
 */
export const executePayStartDetail = async (
  payParams: PayStartOrder.PayStartOrderParams,
  successCallback: () => void,
  failCallback: () => void,
) => {
  const { payType } = payParams;

  if (payType === PayType.CASH_PAY) {
    await modalConfirm('支付', '是否确认已支付?', async () => {});
  } else {
    const payResult = await handlePayStartDetailOrder(payParams);

    if (payResult.success) {
      successCallback();
    } else {
      failCallback();
    }
  }
};
