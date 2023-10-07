import { Modal } from 'antd';
import { handlePayInvestCardOrder } from '@/utils/member/invest/invest';
import { fetchMemberOrderReceipt } from '@/utils/device/receipt/printFunc';
import { InvestCardTypeEnum } from '@/utils/enums';
import { printReceipt } from '@/utils/device/receipt/print';
import { NEGATIVE_STATUS } from '@/utils/utils';

type PayToMemberOrderParams = {
  orderId: string;
  venueId: string;
  cardType: InvestCardTypeEnum;
  price: number;
  // 完成支付后的回调方法
  finishPayCallback: () => void;
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

/**
 * 使用现金支付已创建的会员充值订单
 * @param params
 */
export async function payToMemberOrderByCash(params: PayToMemberOrderParams) {
  Modal.confirm({
    title: '确认',
    content: '确定要支付吗?',
    onOk: async () => {
      const payResult = await handlePayInvestCardOrder({
        payType: NEGATIVE_STATUS,
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

        params.finishPayCallback();
      }
    },
  });
}
