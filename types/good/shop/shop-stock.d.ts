export declare namespace ShopStock {
  type SearchShopStockParams = {
    shopId: string;
    productTypeId: string;
    productId: string;
  };

  type ShopStockItem = {
    num: number;
    isDeposit: string; // 1需要押金 , 0不需要押金
    price: number;
    deposit: number;
  } & SearchShopStockParams;

  /**
   * 商定库存列表参数
   */
  type ShopStockListItem = ShopStockItem & NormalResponseField;

  /**
   * 用于转换 普通商品为租赁商品
   */
  type SaveLeaseTotalParams = Pick<ShopStockItem, 'shopId' | 'num' | 'productId'> &
    NewSaveLeaseTotalParams;

  /**
   * 商品 用于租赁的参数
   */
  type NewSaveLeaseTotalParams = {
    // 是否需要押金
    isDeposit: string;
    deposit: number;
    // 损坏赔偿金额
    compensationPrice: number;
    price: number;
    priceType: string;
    timesType: string;
  };
}
