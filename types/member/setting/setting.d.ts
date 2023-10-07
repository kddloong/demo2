declare namespace MemberCardConfigSetting {
  interface TimesItem {
    timeConfigId: string;
    amount: number;
    days: number;
    daysGive: number;
    cardName: string;
  }

  interface NumberItem {
    numberConfigId: string;
    amount: number;
    cardName: string;
    numberGive: number;
    number: string;
  }

  interface ChargeDataItem {
    chargeDetailId: string;
    levelName?: string;
    sales?: string;
    amount: number;
    amountGive?: number;
  }

  interface SettingItem {
    id: string;
    name: string;
    useType: string | string[]; // '0' 实物卡 , '1'人脸识别 , '2'小程序会员卡
    type: string; //'0'储值卡 '1'期限卡, '2'计次卡
    venueIds: string | string[];
    agree: string;
    description: string;
    backgroundImage: string;
    backgroundType: string;
    backgroundColor: string;
    //是否支付赛事
    isSupportGame: string;
    //是否支持课程
    isSupportClass: string;
    //是否支持售卖
    isSupportProductSell: string;
    //是否支持出租
    isSupportProductLease: string;
  }

  type SettingListItem = NormalResponseField & SettingItem;

  type SaveSettingItem = SettingItem & {
    times?: TimesItem[];
    numbers?: NumberItem[];
    chargeDetails?: ChargeDataItem[];
  } & Partial<ChargeItem>;

  type DetailItem =
    | MemberCardConfigSetting.TimesItem
    | MemberCardConfigSetting.ChargeDataItem
    | MemberCardConfigSetting.NumberItem;

  /**
   * RegisterRadio 里 单个radio的类型
   */
  type DetailCompleteItem = DetailItem & { configDetailId: string };

  /** 只有在会员卡设置的时候用得到 */
  interface ChargeItem {
    isChargeDiscount: string;
    isConsumeDisCount: string;
    isLevel: string;
  }

  type MemberCardListParams = {
    name?: string;
    type?: string;
  };

  type MemberCardListInfo = {
    id: string;
    name: string;
    type: string; //'0'储值卡 '1'期限卡, '2'计次卡
    venueNames: string; // 适用场地
    amount: string; // 面值
  };

  type MemberTransactionParams = {
    type: string | string[]; // '0' 实物卡 , '1'人脸识别 , '2'小程序会员卡,  '3'虚拟卡
    id?: string; // 不传id就是新增，传id就是修改
  };

  type MemberTransactionInfo = {
    id: string;
    tenantId: string;
    type: string | string[]; // '0' 实物卡 , '1'人脸识别 , '2'小程序会员卡  '3'虚拟卡
  };
}
