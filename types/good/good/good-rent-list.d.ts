export declare namespace GoodForRent {
  type SearchGoodForRentParams = {
    productName: string;
    productTypeId: string;
  };

  type GoodForRentItem = {
    barCode: string;
    id: string;
    productBrandId: string;
    unit: string;
    price: number;
    num: number;
    deposit: number;
    isDeposit: string;
    holidayPrice: number;
    //规格
    specifications: string;
    //  折扣
    sales: number;
  } & SearchGoodForRentParams;

  type GoodForRentListItem = GoodForRentItem & NormalResponseField;

  type SearchForWorkplace = SearchGoodForRentParams & {
    current: number;
    pageSize: number;
  };
}
