declare namespace CutCount {
  interface CutCountItem {
    //会员编号
    cardNo: string;
    //消费次数
    cutNumber: number;
    //消费时间
    cutTime: number;
    //会员姓名
    memName: string;
    //关联的会员
    memberId: string;
    //备注
    memo: string;
    //剩余次数
    number: number;
    //操作人
    operateUser: string;
    //关联订单号ID
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

  type CutCountListItem = CutCountItem & BaseResponseField;
}
