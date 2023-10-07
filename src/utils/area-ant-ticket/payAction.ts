import { handlePayInvestCardOrder } from '@/utils/member/invest/invest';
import { handlePayLessonSignUpOrder } from '@/utils/lesson/lesson-arrange/group-lesson-arrange';
import { handlePayGoodSellOrder } from '@/utils/good/sell/good-sell';
import { handlePayRaceOrder } from '@/utils/race/manage/race-arrange';
import { handlePayStartDetailOrder, handlePayStartOrder } from '@/utils/area/start';
import { handlePayRentOrder } from '@/utils/good/sell/good-rent';
import { handlePayReverseDetailOrder, handlePayReverseOrder } from '@/utils/area/schedule';
import { handlePayTicketDetailOrder } from '@/utils/ticket/order';
import { sendLog } from '@/utils/utils';

type PayParams = {
  id: string;
  payType: string;
  discountReasonId: string;
  reason: string;
  authCode: string;
};

type MemberChargePayParams = {
  id: string;
  payType: string;
  authCode: string;
  venueId: string;
  category: string;
  memo: string;
  price: number;
};

export const payAction = async (
  paySource:
    | 'ticket'
    | 'start'
    | 'check'
    | 'member'
    | 'rent'
    | 'race'
    | 'sell'
    | 'lesson'
    | 'combo'
    | 'reverse',
  params: PayParams | MemberChargePayParams,
  actionSource: 'scan' | 'finish' | 'loading',
  isChildrenOrder: boolean = false,
) => {
  sendLog(`支付来源为:${paySource}`);

  if (actionSource === 'finish') {
    return;
  }

  if (!params.id) {
    return Promise.reject();
  }

  if (paySource === 'ticket' || paySource === 'reverse' || paySource === 'check') {
    if (isChildrenOrder && paySource === 'reverse') {
      return await handlePayReverseDetailOrder(params);
    } else if (isChildrenOrder && (paySource === 'check' || paySource.indexOf('ticket') >= 0)) {
      return await handlePayTicketDetailOrder(params);
    }
    return await handlePayReverseOrder(params);
  }

  if (paySource === 'start') {
    if (isChildrenOrder) {
      return await handlePayStartDetailOrder(params);
    } else {
      return await handlePayStartOrder(params);
    }
  }

  if (paySource === 'member') {
    //检查是否有detailType
    Object.assign(params, {
      orderId: params.id,
      memo: '',
    });

    if ('memo' in params && 'orderId' in params) {
      return await handlePayInvestCardOrder(params);
    }
  }

  if (paySource === 'rent') {
    Object.assign(params, {
      orderId: params.id,
      memo: '',
    });

    if ('memo' in params && 'orderId' in params) {
      return await handlePayRentOrder(params);
    }
  }

  if (paySource === 'race') {
    return await handlePayRaceOrder(params.id, params.authCode, params.payType);
  }

  if (paySource === 'sell') {
    return await handlePayGoodSellOrder({
      orderId: params.id,
      authCode: params.authCode,
      payType: params.payType,
    });
  }

  if (paySource === 'lesson') {
    return await handlePayLessonSignUpOrder({
      id: params.id,
      authCode: params.authCode,
      payType: params.payType,
    });
  }

  return null;
};
