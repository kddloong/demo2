declare namespace ContinueCard {
  interface ContinueCardItem {
    //会员卡名称
    name: string;
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

    //购买天数
    continueDay: number;
    //购买时间
    continueTime: number;
    //赠送天数
    dayGive: number;
    //到期时间
    expireDay: number;
    //会员编号
    cardNo: string;
    //手机号
    phoneNo: string;
    //开始时间
    timeFrom: string;
    //结束时间
    timeTo: string;
  }

  type ContinueCardListItem = ContinueCardItem & BaseResponseField;
}
