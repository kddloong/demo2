

export enum InvestCardTypeEnum {
  // 储值卡
  STORE_CARD = '0',
  // 期限卡
  EXPIRE_CARD = '1',
  // 计次卡
  COUNT_CARD = '2',
}

export enum payStatusEnum {
  NOT_PAY = '0',
  ALREADY_PAY = '1',
}

/**
 * 支付
 */
export enum ConsumptionTypeEnum {
  START_ORDER = '0',
  REVERSE_AND_TICKET_ORDER = '1',
  GOOD_SELL_ORDER = '2',
  GOOD_RENT_ORDER = '3',
  RACE = '4',
  LESSON_SIGN_UP = '5',
  LESSON_COMBO = '6',
}

export enum fromSetting {
  FROM_VENUE = '2',
  FROM_AREA = '0',
}

