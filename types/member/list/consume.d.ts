declare namespace Consume {
  interface ConsumeItem {
    //余额
    amount: number;
    //会员编号
    cardNo: string;
    //会员卡名称
    configName: string;
    //消费金额
    consumeAmount: number;
    //消费时间
    consumeTime: number;
    //会员姓名
    memName: string;
    //关联的会员
    memberId: string;
    //备注
    memo: string;
    //操作人
    operateUser: string;
    //订单号
    orderNo: string;
    //支付状态
    payStatus: string;
    //付款方式
    payType: string;
    //手机号
    phoneNo: string;
    //订单状态
    status: string;
    //开始时间
    timeFrom: string;
    //结束时间
    timeTo: string;
    //来源渠道
    type: string;
    //购买场馆
    venueName: string;
  }

  type ConsumeListItem = ConsumeItem & BaseResponseField;
}
