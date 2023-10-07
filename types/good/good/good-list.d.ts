export declare namespace Good {
  type SearchGoodParams = {
    productName: string;
    productTypeId: string;
  };

  type GoodItem = {
    barCode: string;
    id: string;
    productBrandId: string;
    unit: string;
    sellPrice: number;
    purchasePrice: number;
    //规格
    specifications: string;
    //  折扣
    sales: number;
    imageUrl: string;
  } & SearchGoodParams;

  type GoodListItem = GoodItem & NormalResponseField;
}
