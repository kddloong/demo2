import { Modal } from 'antd';
import { handlePayInvestCardOrder } from '@/utils/member/invest/invest';
import { printReceipt } from '@/utils/device/receipt/print';
import { fetchMemberOrderReceipt } from '@/utils/device/receipt/printFunc';
import { InvestCardTypeEnum } from '@/utils/enums';

export type paramsFunc = {
  payType: string;
  orderId: string;
  cardType: string;
  venueId: string;
  price: number;
  callback: () => void;
};

function setMemberType(type: InvestCardTypeEnum) {
  if (type === InvestCardTypeEnum.COUNT_CARD) {
    return 'count';
  }

  if (type === InvestCardTypeEnum.EXPIRE_CARD) {
    return 'expire';
  }

  if (type === InvestCardTypeEnum.STORE_CARD) {
    return 'store';
  }

  throw new Error('类型错误');
}

const rechargeByCash = async (params: paramsFunc, source: 'other' | 'add-member') => {
  Modal.confirm({
    title: '确认',
    content: '确定要支付吗?',
    onOk: async () => {
      const payResult = await handlePayInvestCardOrder({
        payType: params.payType,
        orderId: params.orderId,
        venueId: params.venueId,
        memo: '',
        category: params.cardType,
        authCode: '',
        price: params.price,
      });

      if (payResult.success) {
        const receiptData = await fetchMemberOrderReceipt(
          params.orderId,
          setMemberType(params.cardType as InvestCardTypeEnum),
        );

        if (receiptData) {
          printReceipt(receiptData);
        }

        if (source === 'other') {
          params.callback();
        }

        if (source === 'add-member') {
          params.callback();
          // history.back();
        }
      }
    },
  });
};

export { rechargeByCash };
