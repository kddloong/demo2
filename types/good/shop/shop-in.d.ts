export declare namespace ShopIn {
  interface ShopInItem {
    id: string;
    status: string;
    orderNo: string;
    source: string;
    operatorName: string;
  }

  /**
   * 入商店订单表格行字段
   */
  type ShopInListItem = ShopInItem & NormalResponseField;

  /**
   * 创建订单的必填项
   */
  interface PushCreateShopIn {
    shopId: string;
    supplierId: string;
  }

  /**
   * 生成订单返回的字段
   * 或者
   * 获取订单信息返回的字段
   */
  type CreateShopInOrderInfo = {
    id: string;
    status: string;
    orderNo: string;
  } & NormalResponseField &
    PushCreateShopIn;
}
