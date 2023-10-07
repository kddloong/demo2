export declare namespace GoodRentWorkplace {
  /**
   * 商品租赁页面 用于显示在卡片上的字段
   */
  type GoodRentItem = {
    barCode: string;
    deposit: number;
    label: string;
    price: number;
    salesPrice: number;
    unit: string;
    value: string;
    brand: string;
    num: number;
  };

  type RentPerson = {
    people: string;
    phone: string;
  };

  /**
   * 租赁订单的信息
   * num 为 租赁的商品数量
   */
  type RentOrderItem = Omit<GoodRentItem, 'productName' | 'productType' | 'productBrand'> &
    RentPerson & {
      status: string;
      //出租时长(暂时用不到)
      times?: string;
      payType: string;
      orderNo: string;
      leaseTime: string;
      id: string;
    };

  /**
   * 已选的租赁商品参数
   */
  type GoodRentItemForChosedGood = {
    rentNum: number;
    num: number;
    deposit: number;
    /**商品名称*/
    label: string;
    /**商品id*/
    value: string;
    salesPrice: number;
  };

  type SaveRentParams = {
    details: SaveRentDetailItem[];
    leaseTime: string;
  } & RentPerson;

  type SaveRentDetailItem = {
    deposit: number;
    // 退款状态  '0'-未退款  '1'-已退款
    depositStatus: string;
    num: number;
    price: number;
    productId: string;
    // 实际退的押金
    refundDeposit: number;
    // 扣除押金的原因
    refundDepositReason: string;
  };

  /** 传给获取价钱接口的参数*/
  type FetchNeedPrice = {
    lst: FetchNeedPriceParams[];
  };

  type FetchRentNeedPrice = FetchNeedPrice & { memberId: string; configId: string };

  /** 传给获取价钱接口的数组项*/
  type FetchNeedPriceParams = {
    num: number;
    productId: string;
  };

  /** 支付租赁订单的参数*/
  type PayOrderParams = {
    authCode: string;
    payType: string;
    orderId: string;
  };

  /**
   * 保存订单返回的内容
   */
  type RentOrderItem = {
    actPrice: number;
    billNo: string;
    clientId: string;
    deposit: number;
    depositStatus: string;
    id: string;
    leaseTime: string;
    orderNo: string;
    payStatus: string;
    payType: string;
    people: string;
    phone: string;
    price: number;
    refundPrice: number;
    status: string;
    tenantId: string;
  };

  /**
   * 从接口返回的租赁订单的子订单的信息
   * @date 2022-11-06
   */
  type FetchRentDetailItem = SaveRentDetailItem & {
    productName: string;
    id: string;
  };

  type FetchRentOrderForPrint = {
    leaseTime: string;
    orderNo: string;
    payType: string;
    totalPrice: number;
    detail: FetchRentOrderForPrintDetail[];
  };

  type FetchRentOrderForPrintDetail = {
    deposit: number;
    depositStatus: string;
    id: string;
    num: number;
    price: number;
    productId: string;
    productName: string;
    refundDeposit: number;
    refundDepositReason: string;
  };

  /**
   * 退押金传的参数
   */
  type BackDepositDetailParams = {
    productId: string;
    refundDeposit: number;
    refundDepositReason: string;
  };
}

export declare namespace ShopRent {
  type SearchShopRentParams = SearchTimeRangeParams & {
    shopId: string;
    status: shopRentStatusEnum;
  };

  type ShopRentItem = {
    actPrice: number;
    billNo: string;
    clientId: string;
    deposit: number;
    // 押金状态, 0 已付押金, 1已退押金
    depositStatus: string;
    id: string;
    leaseTime: string;
    orderNo: string;
    payStatus: string;
    payType: string;
    people: string;
    phone: string;
    price: number;
    refundPrice: number;
    status: string;
    tenantId: string;
    refundReason: string;
  };

  type ShowRentListItem = ShopRentItem & NormalResponseField;

  /**
   * 用于支付工作台的租赁订单信息
   */
  type ShowRentListItemWithDetails = ShowRentListItem & {
    details: GoodRentWorkplace.FetchRentDetailItem[];
  };
}
