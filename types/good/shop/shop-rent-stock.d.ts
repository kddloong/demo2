export declare namespace ShopRentStock {
  type SearchShopRentStockParams = {
    shopId: string;
    productTypeId: string;
    productId: string;
  };

  type ShopRentStockItem = {
    num: number;
    compensationPrice: number;
    deposit: string;
    isDeposit: string;
  } & SearchShopRentStockParams;

  type ShopRentStockListItem = ShopRentStockItem & NormalResponseField;
}
