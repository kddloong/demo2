import { TypeUtil } from '../utils';

declare namespace PayReverseOrder {
  /**
   * 支付预定订单的参数
   * @date 2023-09-18 目前跟开场订单的参数是一致的
   */
  type PayReverseOrderParams = {
    id: string;
    payType: string;
    authCode: string;
    // 会员支付必填
    balanceId: string;
    consumeAmount: number;
    consumeNum: number;
    // isDiscount === '1' 必填
    discountId: string;
    // 必填
    isDiscount: string;
  };
}

declare namespace ReverseDetailOrder {
  type OrderItem = TypeUtil.NormalResponseField & {
    actEndTime: null;
    actNum: number;
    actPrice: number;
    actStartTime: null;
    balanceId: string;
    billNo: string;
    bookDate: string;
    bookTimeFrom: string;
    bookTimeTo: string;
    buyerId: string;
    cancelReason: string;
    cancelReasonId: string;
    discountId: string;
    id: string;
    isDiscount: string;
    orderCode: string;
    orderId: string;
    payStatus: string;
    payType: string;
    price: number;
    refundAmount: number;
    refundNum: number;
    refundReason: string;
    refundStatus: string;
    status: string;
    venueId: string;
    verificationTime: null;
    verificationUser: string;
  };
}
