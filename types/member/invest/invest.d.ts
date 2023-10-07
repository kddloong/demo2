import { InvestCardTypeEnum } from '@/utils/enums';

export declare namespace InvestCard {
  // 用于开卡接口
  type OpenCardParams = {
    //余额
    balance?: number;

    //到期时间
    expireDay?: string;

    //会员等级
    levelName?: string;

    //剩余的次数
    number?: string;
    //折扣
    sales?: number;
    // 状态 0锁定 1正常 2挂失
    status?: InvestCardStatusEnum;
    // 会员卡类型 0储值卡 1期限卡 2计次卡
    type?: InvestCardTypeEnum;
    //
    memo?: string;
  } & BaseOpenCardParams;

  // 开卡参数
  type BaseOpenCardParams = {
    //
    id?: string;
    type: InvestCardTypeEnum | string;
    // 会员卡id
    configId: string;
    // 关联的会员
    memberId: string;
    //
    venueId: string;
  };

  type BaseConfigInfoParams = {
    // 会员卡设置的id
    configId: string;
    // 会员卡类型  0 储值, todo
    detailType: InvestCardTypeEnum | string;
    price: number;
    // 会员卡设置的档次的id
    detailId: string;
  };

  type BaseConfigInfoParamsRemake = {
    // 会员卡类型  0 储值, todo
    detailType: InvestCardTypeEnum | string;
    // 会员卡设置的档次的id
    detailId: string;
  };

  type ShowConfigInfoParams = {
    daysGive: number;
    cardName: string;
    numberGive: number;
    amountGive: number;
  };

  /**
   * 调用开卡接口返回的值
   */
  type OpenCardResult = {
    balance: number;
    configId: string;
    id: string;
    levelName: string;
    memberId: string;
    number: number;
    sales: number;
    status: string;
    type: string;
  };

  // 创建充值订单的核心参数
  type CoreParams = {
    // 会员卡设置id
    configId: string;
    // 关联的会员
    memberId: string;
    //
    venueId: string;

    price: number;
    payType: string;
  };

  // 创建 储值卡 订单参数
  type CreateStoreOrderParams = CoreParams & {
    chargeConfigDetailId: string;
    memo: string;
  };

  // 创建 计次卡 订单参数
  type CreateCountOrderParams = CoreParams & {
    numberConfigDetailId: string;
    memo: string;
  };

  // 创建 期限卡 订单参数
  type CreateExpireOrderParams = CoreParams & {
    continueConfigDetailId: string;
    memo: string;
  };

  //支付订单参数
  type PayOrderParams = {
    orderId: string;
    memo: string;
    venueId: string;
    category: InvestCardTypeEnum | string;
    payType: string;
    price: number;
    authCode: string;
  };

  type InvestConfigProps = {
    configId: string;
    detailType: string | InvestCardTypeEnum;
  } & Partial<MemberCardConfigSetting.DetailCompleteItem>;
}
