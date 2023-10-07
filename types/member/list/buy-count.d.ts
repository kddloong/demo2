import type { BaseResponseField } from '@/type/data';

declare namespace BuyCount {
  interface BuyCountItem {
    //购买次数
    buyNumber: number;
    //购买时间
    buyTime: number;
    //会员卡名称
    configName: string;
    //会员姓名
    memName: string;
    //备注
    memo: string;
    //赠送次数
    numberGive: number;
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
    //手机号
    phoneNo: string;
    //开始时间
    timeFrom: number;
    //结束时间
    timeTo: number;
  }

  type BuyCountListItem = BuyCountItem & BaseResponseField;
}
