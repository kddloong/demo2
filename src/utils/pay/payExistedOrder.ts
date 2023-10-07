import { sendLog } from '@/utils/utils';
import { PayStartOrder } from 'types/area/start';
import { executePayStart, executePayStartDetail } from '@/utils/pay/startOrder';
import {
  executePayReverse,
  executePayReverseDetail,
  executePayTicketDetail,
} from '@/utils/pay/reverseOrder';
import { PayType } from '@/utils/pay/pay';
import {fetchTestReceipt, fetchVenueOrderReceipt} from '@/utils/device/receipt/printFunc';
import { printReceipt } from '@/utils/device/receipt/print';
import { handleCheckDetailOrder, handleCheckOrder } from '@/utils/area/schedule';

/**
 * 与订单相关的信息， 来自哪个模块
 * @date 加上 'check' 售票并核销
 */
type EnvParams = {
  orderType: 'start' | 'reverse' | 'check' | 'occupy';
};

/**
 * 订单基本信息
 */
type OrderBaseInfoParams = {
  orderId: string;
};

/**
 * 支付相关的信息
 */
type PayParams = Omit<PayStartOrder.PayStartOrderParams, 'id'>;

/**
 * 针对场地工作台已创建的订单执行支付, 支付方式包含需要扫码支付的
 * @date 2023-09-15
 * @param envParams
 * @param orderInfo
 * @param payInfo
 * @param successCallback 支付成功后的回调
 * @param failCallback
 */
export const executeAreaWorkplacePayExistedOrder = async (
  envParams: EnvParams,
  orderInfo: OrderBaseInfoParams,
  payInfo: PayParams,
  successCallback: (needScanCode: boolean) => Promise<void>,
  failCallback: () => void = () => {},
) => {
  const { orderType } = envParams;

  const { orderId } = orderInfo;

  // 如果当前订单选择的支付方式不是现金或会员卡支付
  if (![PayType.MEMBER_CARD_PAY, PayType.CASH_PAY].includes(payInfo.payType)) {
    successCallback(true);

    return;
  }

  if (orderType === 'start') {
    await executePayStart(
      {
        id: orderId,
        ...payInfo,
      },
      async () => {
        successCallback(false);
      },
      () => {
        sendLog(`${orderId}支付失败`);
        failCallback();
      },
    );
  }

  if (orderType === 'reverse' || orderType === 'check') {
    await executePayReverse(
      {
        id: orderId,
        ...payInfo,
      },
      async () => {
        if (orderType === 'check') {
          await handleCheckOrder(orderId, '0');
        }

        // const receiptModel = await fetchVenueOrderReceipt(orderId);

        // todo 写完测试后删除
        const receiptModel = await fetchTestReceipt(orderId);

        if (receiptModel) {
          printReceipt(receiptModel);
        }

        successCallback(false);
      },
      () => {
        sendLog(`${orderId}支付失败`);
        failCallback();
      },
    );
  }

  return null;
};

/**
 * 针对场地工作台已创建的订单执行支付, 支付方式包含需要扫码支付的
 * @date 2023-09-15
 * @param envParams
 * @param orderInfo
 * @param payInfo
 * @param successCallback 支付成功后的回调
 * @param failCallback
 */
export const executeAreaWorkplacePayExistedDetailOrder = async (
  envParams: EnvParams,
  orderInfo: OrderBaseInfoParams,
  payInfo: PayParams,
  successCallback: (needScanCode: boolean) => Promise<void>,
  failCallback: () => Promise<void>,
) => {
  const { orderType } = envParams;

  console.log(`orderT`, orderType);

  const { orderId } = orderInfo;

  // 如果当前订单选择的支付方式不是现金或会员卡支付
  if (![PayType.MEMBER_CARD_PAY, PayType.CASH_PAY].includes(payInfo.payType)) {
    successCallback(true);

    return;
  }

  if (orderType === 'start') {
    await executePayStartDetail(
      {
        id: orderId,
        ...payInfo,
      },
      () => {
        successCallback(false);
      },
      () => {
        sendLog(`${orderId}支付失败`);
        failCallback();
      },
    );
  }

  if (orderType === 'reverse') {
    await executePayReverseDetail(
      {
        id: orderId,
        ...payInfo,
      },
      () => {
        successCallback(false);
      },
      () => {
        sendLog(`${orderId}支付失败`);
        failCallback();
      },
    );
  }

  return null;
};

/**
 * 针对售票工作台已创建的订单执行支付, 支付方式包含需要扫码支付的
 * @date 2023-09-15
 * @param envParams
 * @param orderInfo
 * @param payInfo
 * @param successCallback 支付成功后的回调
 */
export const executeTicketPayExistedDetailOrder = async (
  envParams: {
    openSource: 'check' | 'ticket';
  },
  orderInfo: OrderBaseInfoParams,
  payInfo: PayParams,
  successCallback: (needScanCode: boolean) => Promise<void>,
) => {
  const { orderId } = orderInfo;

  const { openSource } = envParams;

  // 如果当前订单选择的支付方式不是现金或会员卡支付
  if (![PayType.MEMBER_CARD_PAY, PayType.CASH_PAY].includes(payInfo.payType)) {
    successCallback(true);

    return;
  }

  await executePayTicketDetail(
    {
      id: orderId,
      ...payInfo,
    },
    async () => {
      if (openSource === 'check') {
        await handleCheckDetailOrder(orderId, '2');
      }

      successCallback(false);
    },
    () => {
      sendLog(`${orderId}支付失败`);
    },
  );
};
