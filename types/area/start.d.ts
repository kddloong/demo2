import type { BaseResponseField } from '@/type/data';

// 场地控制台管理
export namespace AreaOrder {
  // 场地 开场订单管理
  export declare namespace AreaStartOrderManage {
    // 创建开场订单 的 参数管理
    export declare namespace CreateAreaStartOrderManage {
      interface CreateAreaStartDetailOrderItem {
        startDate: string;
        timeFrom: string;
        timeTo: string;
        venueId: string;
      }

      interface CreateAreaStartOrderParams {
        contact: string;
        contactPhoneNo: string;
        deposit: number;
        details: CreateAreaStartDetailOrderItem[];
        memberId: string;
        memo: string;
        // 开场类型
        type: string;
        venueId: string;
        mobilizationNumber: number;
      }
    }
  }
}

export declare namespace AreaStart {
  interface AreaStartItem {
    actTotalNum: number;
    actTotalPrice: number;
    balanceId: string;
    billNo: string;
    bookNo: string;
    buyerId: string;
    clientId: string;
    contact: string;
    contactPhoneNo: string;
    createDate: string;
    createName: string;
    discountId: string;
    id: string;
    isDiscount: string;
    memberId: string;
    memo: string;
    mobilizationNumber: number;
    orderCode: string;
    orderNo: string;
    overTimePrice: number;
    payStatus: string;
    payType: string;
    refundReason: string;
    refundStatus: string;
    status: string;
    tenantId: string;
    todayDate: string;
    totalPrice: number;
    totalRefundAmount: number;
    totalRefundNum: number;
    type: string;
    updateDate: string;
    updateName: string;
    venueId: string;
    versions: number;
  }
}

export declare namespace VenueStartOrder {
  interface VenueStartDetailOrderItem {
    actNum: number;
    actPrice: number;
    balanceId: string;
    billNo: string;
    buyerId: string;
    clientId: string;
    createDate: string;
    createName: string;
    discountId: string;
    id: string;
    isDiscount: string;
    orderCode: string;
    orderId: string;
    overTimePrice: number;
    payStatus: string;
    payType: string;
    price: number;
    refundAmount: number;
    refundNum: number;
    refundReason: string;
    refundStatus: string;
    status: string;
    tenantId: string;
    timeFrom: string;
    timeTo: string;
    type: string;
    updateDate: string;
    updateName: string;
    useDate: string;
    venueId: string;
    versions: number;
  }

  /**
   * 开场订单信息
   * @date 2023-09-15
   */
  interface StartOrderItem {
    actTotalNum: number;
    actTotalPrice: number;
    // 会员实际余额卡ID
    balanceId: string;
    // 支付单号
    billNo: string;
    // 关联的预定订单号
    bookNo: string;
    // 支付人
    buyerId: string;
    contact: string;
    contactPhoneNo: string;
    //优惠折扣原因选择
    discountId: string;
    id: string;
    // 结算是否优惠
    isDiscount: string;
    memberId: string;
    memo: string;
    mobilizationNumber: number;
    orderNo: string;
    // 超时金额
    overTimePrice: number;
    payStatus: string;
    payType: string;
    refundReason: string;
    // 退款状态
    refundStatus: string;
    status: string;
    todayDate: string;
    totalPrice: number;
    totalRefundAmount: number;
    // 退款次数
    totalRefundNum: number;
    // 开场类型
    type: string;
    // 关联场馆id
    venueId: string;
  }

  interface VenueStartOrderOriginalItem extends BaseResponseField {
    actTotalNum: number;
    actTotalPrice: number;
    // 会员实际余额卡ID
    balanceId: string;
    // 支付单号
    billNo: string;
    // 关联的预定订单号
    bookNo: string;
    // 支付人
    buyerId: string;
    contact: string;
    contactPhoneNo: string;
    //优惠折扣原因选择
    discountId: string;
    id: string;
    // 结算是否优惠
    isDiscount: string;
    memberId: string;
    memo: string;
    mobilizationNumber: number;
    orderNo: string;
    // 超时金额
    overTimePrice: number;
    payStatus: string;
    payType: string;
    refundReason: string;
    // 退款状态
    refundStatus: string;
    status: string;
    todayDate: string;
    totalPrice: number;
    totalRefundAmount: number;
    // 退款次数
    totalRefundNum: number;
    // 开场类型
    type: string;
    // 关联场馆id
    venueId: string;
  }
}

export declare namespace PayStartOrder {
  /**
   * 支付开场订单的参数
   * @date 2022-10-14 删除price, prePrice, 替换 isDiscount, discountId 为 discountReasonId, reason, 加上authCode
   * @date 2023-09-15 删除 reason, discountReasonId 加上 balanceId, consumeAmount, consumeNum, discountId, isDiscount,
   */
  type PayStartOrderParams = {
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
export type PayResult = { wx_message: string } | null;
