declare namespace Invest {
  interface InvestItem {
    //充值金额
    chargeAmount: number;
    //赠送金额
    chargeGive: number;
    //购买时间
    chargeTime: number;
    //会员卡名称
    configName: string;
    //会员姓名
    memName: string;
    //备注
    memo: string;
    //操作人
    operateUser: string;
    //订单号
    orderNo: string;
    //状态 0: 取消 1：正常
    status: string;
    //购买场馆
    venueName: string;
    //会员编号
    cardNo: string;
    //关联的会员
    memberId: string;
    //手机号
    phoneNo: string;
    //开始时间
    timeFrom: string;
    //结束时间
    timeTo: string;
  }

  type InvestListItem = InvestItem & BaseResponseField;
}
