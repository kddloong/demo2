export declare namespace GoodSeller {
  // 订单的基本信息
  type SellerGoodInfo = {
    orderNo: string;
    time: string;
  };

  // 商品售卖页面中间表格的字段
  type SellerGoodItem = Good.GoodItem & {
    sellNum: number;
    totalPrice: number;
  };

  // 获取商品信息的请求参数
  type SearchGoodByShopIdAndBarCode = {
    barcode: string;
    wareHouseId: string;
    num: number;
  };

  // 传到后台的值
  type SellGoodItemForHandle = {
    productId: string;
    num: number;
  };

  type SellRecordTempOrder = { details: SellRecordTemp[]; allPrice: number } & SellerGoodInfo;

  type SellRecord = SellerGoodInfo & {
    // 写的shopId , 应该传 warehouseId
    shopId: string;
    details: SellerGoodItem[] | SellGoodItemForHandle[];
    price: number;
  };

  type PayOrderParams = {
    orderId: string;
    payType: string;
    authCode: string;
  };

  /**
   * 获取售卖订单id获取的订单信息
   */
  type SellOrderItem = BaseResponseField & {
    actPrice: number;
    billNo: string;
    id: string;
    memberName: string;
    memberNo: string;
    memo: string;
    orderNo: string;
    payType: string;
    phoneNo: string;
    price: number;
    refundPrice: number;
    refundReason: string;
    sellTime: string;
    shopId: string;
    status: string;
  };

  /** 传给获取价钱接口的参数*/
  type FetchNeedPrice = {
    lst: FetchNeedPriceParams[];
  };

  type FetchSellNeedPrice = FetchNeedPrice & {
    configId: string;
    memberId: string;
  };

  /** 传给获取价钱接口的数组项*/
  type FetchNeedPriceParams = {
    num: number;
    productId: string;
  };

  type SaveSellDetailItem = {
    num: number;
    price: number;
    productId: string;
  };

  /**
   * 根据订单号返回的数据, 其中details字段返回了购买了哪些商品
   */
  type SellOrderItemContainChildren = BaseResponseField & {
    details: Details[];
    orderNo: string;
    payType: string;
    price: number;
    shopName: string;
    status: string;
    time: string;
  };

  type Details = {
    num: number;
    price: number;
    productName: string;
    productId: string;
  };
}

export declare namespace ShopSell {
  type BaseShopSellParams = {
    orderNo: string;
    shopId: string;
    status: SellOrderStatusEnum;
  };

  type SearchShopSellParams = BaseShopSellParams & SearchTimeRangeParams;

  type ShopSellItem = {
    actPrice: number;
    refundReason: string;
    clientId: string;
    id: string;
    num: number;
    price: number;
    productId: string;
    tenantId: string;
    sellTime: number;
  } & BaseShopSellParams;

  type ShopSellListItem = ShopSellItem & NormalResponseField;
}
