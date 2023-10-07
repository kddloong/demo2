export declare namespace UseOrder {
  type UseOrderItem = {
    //实际消费次数
    actTotalNum: number;
    //实际金额
    actTotalPrice: number;
    //
    actualMobilizationNumber: number;
    //会员实际余额卡ID
    balanceId: string;
    //支付单号
    billNo: string;
    //支付人
    buyerId: string;
    //取消原因手填
    cancelReason: string;
    //取消原因
    cancelReasonId: string;
    //身份证号
    cardNo: string;
    //联系人
    contact: string;
    //联系人电话
    contactPhoneNo: string;
    //优惠折扣原因选择
    discountId: string;
    //主键
    id: string;
    //结算是否优惠
    isDiscount: string;
    //会员编号
    memberId: string;
    //购买票数
    num: number;
    //用户微信唯一标识
    openId: string;
    //预定订单号
    orderNo: string;
    //订单类型
    orderType: string;
    //支付时间
    payDelayTime: number;
    //支付状态
    payStatus: string;
    //支付时间
    payTime: number;
    //支付方式
    payType: string;
    //
    preMobilizationNumber: number;
    //退款原因
    refundReason: string;
    //退款状态
    refundStatus: string;
    //来源
    source: string;
    //订单状态
    status: string;
    //订单名称，小程序显示用
    title: string;
    //订单金额
    totalPrice: number;
    //退款金额
    totalRefundAmount: number;
    //退款次数
    totalRefundNum: number;
    //关联场馆ID
    venueId: string;
    //核销时间
    verificationTime: number;
    //核销人员
    verificationUser: string;
  };
}
