declare namespace OpenCard {
  interface OpenCardItem {
    //会员卡名称
    configName: string;
    //会员名字
    memName: string;
    //备注
    memo: string;
    //操作人
    operateUser: string;
    //会员手机号
    phoneNo: string;
    //开卡时间
    time: number;
    //开场场馆
    venueName: string;
    //会员编号
    cardNo: string;
    //关联的会员
    memberId: string;
    //开始时间
    timeFrom: string;
    //结束时间
    timeTo: string;
  }

  type OpenCardListItem = OpenCardItem & BaseResponseField;
}
