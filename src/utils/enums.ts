export enum priceType {
  NORMAL = '0',
  LOW_FREE = '1',
  FREE = '2',
  HOLIDAY = '3',
}

export enum InvestCardTypeEnum {
  // 储值卡
  STORE_CARD = '0',
  // 期限卡
  EXPIRE_CARD = '1',
  // 计次卡
  COUNT_CARD = '2',
}

/**
 * 会员订单状态枚举
 */
export enum MemberOrderStatusEnum {
  CREATE = '0',
  ALREADY_PAY = '1',
  BACK_PRICE = '5',
  CANCEL = '6',
}

// 支付状态的枚举
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

// 发起请求的地方, '0' 场地, '1' 场馆
export enum fromSetting {
  FROM_VENUE = '2',
  FROM_AREA = '0',
}

// 小票组成部分类型枚举
export enum ReceiptModelTypeEnum {
  TWO_COlUMN_TABlE = 'two_column_table',
  THREE_COLUMN_TABLE = 'three_column_table',
  CONTENT = 'content',
  GUTTER = 'gutter',
  QRCODE = 'qrcode',

  LIST = 'list',
}

/**
 * 课程订单状态枚举
 */
export enum LessonComboOrderStatusEnum {
  WILL_PAY = '0',
  ALREADY_PAY = '1',
  CANCELED = '2',
  BACK_PRICE = '3',
  NEED_COMMENT = '4',
  FINISH = '5',
}

/**课程预约的支付方式*/
export enum LessonSignUpPayTypeEnum {
  //现金支付
  USE_MONEY = '0',
  //套餐支付
  USE_COMBO = '1',
}

/**课程报名状态 枚举*/
export enum LessonSignUpStatusEnum {
  NEED_PAY = '0',
  SIGN_UP_SUCCESS = '1',
  SIGN_UP_FAIL = '2',

  BACK = '3',
  CANCEL = '4',
  // 消课
  CHECK_IN = '5',
}

export enum sexEnum {
  MALE = '0',
  FEMALE = '1',
  NO_LIMIT = '-1',
}

export enum lessonStatus {
  STOP_STATUS = '0',
  NORMAL_STATUS = '1',
}

/**
 * 赛事状态
 */
export const RACE_STATUS = {
  // 草稿
  DRAFT: '0',
  // 已发布
  PUBLISH: '1',
  // 结束
  END: '2',
  // 下线
  DOWN: '3',
};

/**
 * 赛事报名状态
 */
export enum raceSignUpEnum {
  IN_SIGN_UP = '0',
  SIGN_UP_SUCCESS = '1',

  SIGN_UP_FAIL = '2',

  BACK_PRICE = '3',

  CANCEL = '4',

  FINISH = '5',
}

/**
 * 出租订单状态
 */
export enum shopRentStatusEnum {
  //已出租
  ALREADY_RENTED = '0',
  // 已归还
  BACK = '1',
  CREATE = '2',
  //已退款
  BACK_PRICE = '3',
}

/**商品租赁 押金状态*/
export enum rentDepositStatusEnum {
  //已付押金
  ALREADY_PAY = '0',
  //已退押金
  ALREADY_BACK = '1',
  //未支付
  NEED_PAY = '',
}

export enum venueType {
  SHOP = '3',
  WAREHOUSE = '4',
}

export enum ShopInOrderStatusEnum {
  CREATE = '0',
  ALREADY_SUBMIT = '1',
}

export enum ShopInSourceEnum {
  //直接入店
  DIRECT = '0',
  //仓库出库
  FORM_WAREHOUSE = '1',
}

export enum GoodInOrderStatusEnum {
  CREATE = '0',

  ALREADY_SUBMIT = '1',
}

export enum InDestinationEnum {
  SUPPLIER = '0',
  BACK = '1',
  OTHERS = '3',
  // 调库
  RECONCILING_INVENTORY = '2',
}

export enum GoodOutOrderStatusEnum {
  CREATE = '0',
  ALREADY_OUT = '1',
}

/**
 * 出库的目的地
 */
export enum OutDestinationEnum {
  SHOP = '0',
  WAREHOUSE = '1',
  DAMAGE = '4',
  OTHERS = '2',
}

export enum InventoryEnum {
  Warehouse = '0',
  Sell = '1',
  Rent = '2',
}

export enum CardTypeEnum {
  ICCARD = '0',
  BRACELET = '1',
}

export enum CardStatusEnum {
  WAREHOUSED = '0',
  USED = '1',
  REVOKED = '2',
  // 退卡
  BACK = '3',
}

export enum UseStatusEnum {
  NORMAL_STATUS = '1',

  STOP_STATUS = '0',
}

/**
 * 闸机状态
 */
export enum GateEnum {
  OUTLINE = '0',
  ONLINE = '1',
}

//设备使用方式
export enum StoreFixEnum {
  RANDOM = 0,
  FIXED = 1,
}

export enum DeviceTypeEnum {
  //卡
  CARD = 1,
  //指纹
  FINGER = 2,
  CARD_AND_FINGER = 3,
  //密码
  PASSWORD = 4,
  PASSWORD_AND_CARD = 5,
}

export enum TrafficTypeEnum {
  NONE = '0',
  YU_SHI = '1',
  HAI_KANG = '2',
}

export enum MessageSourceEnum {
  NONE = '0',
  // 使用运营平台的设置
  FROM_YUNYING = '9',
  // 自己配置阿里云
  SELF_ALI_CLOUD = '10',
  // 自己配置的腾讯云
  SELF_TENCENT_CLOUD = '11',
}

export enum InvestCardStatusEnum {
  //锁定
  LOCK = '0',
  // 正常
  NORMAL = '1',
  //挂失
  LOSS = '2',
}

export enum SellOrderStatusEnum {
  // 未支付, 暂挂
  CREATE = '0',
  // 已支付
  FINISH = '1',
  BACK = '3',
}

// 0 ：团操课 1：私教课 2：班级课
export enum LessonCategoryEnum {
  GROUP_LESSON = '0',

  PRIVATE_LESSON = '1',

  CLASS_LESSON = '2',
}

/**套餐订单状态 枚举*/
export enum ComboOrderStatusEnum {
  //待支付
  WILL_PAY = '0',
  //已支付
  ALREADY_PAY = '1',
  //已取消
  CANCEL = '2',
  //已退款
  BACK_PRICE = '3',
  //待评价
  NEED_COMMENT = '4',
  //完成
  FINISH = '5',
}

// 活动类型枚举 1线索 2客户 3联系人 4商机 5合同 6发票
export enum ActivityCategoryEnum {
  CLUE = '1',
  CUSTOMER = '2',
  LINKMAN = '3',
  OPPORTUNITY = '4',
  CONTRACT = '5',
  INVOICE = '6',
}
