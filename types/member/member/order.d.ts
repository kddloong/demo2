declare namespace MemberOrder {
  interface OrderItem {
    //充值金额
    amount: number;
    //赠送金额
    amountGive: number;
    //会员卡名称
    configName: string;
    //购买天数
    day: number;
    //赠送天数
    dayGive: number;
    //会员名字
    memName: string;
    //备注
    memo: string;
    //购买次数
    number: number;
    //赠送次数
    numberGive: number;
    //操作人
    operateUser: string;
    //关联订单号ID
    orderNo: string;
    //订单时间
    orderTime: number;
    //支付状态
    payStatus: string;
    //付款方式
    payType: string;
    //订单状态
    status: string;
    //来源渠道
    type: string;
    //开场场馆
    venueName: string;
    id: string;
    //关联的会员
    memberId: string;
    //开始时间
    timeFrom: string;
    //结束时间
    timeTo: string;
  }

  type OrderListItem = OrderItem & BaseResponseField;
}

declare namespace MemberOrder {
  interface MemberOrderItem extends BaseResponseField {
    refundReason: string;
    amount: number;
    amountGive: number;
    balance: number;
    billNo: string;
    configId: string;
    day: number;
    dayGive: number;
    id: string;
    memberId: string;
    memberStatus: string;
    memo: string;
    number: number;
    numberGive: number;
    operateUser: string;
    orderNo: string;
    orderTime: string;
    payStatus: string;
    payType: string;
    price: number;
    sales: number;
    status: string;
    totalRefundAmount: number;
    type: string;
    venueId: string;
  }
}
