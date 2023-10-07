export type OperationalDataType = {
  TodayGoodsAdd: string;
  YestodayGoodsAdd: string;
  TodayGoodsSell: string;
  YestodayGoodsSell: string;
  TodaySalesAmount: string;
  YestodaySalesAmount: string;
  TodayLeaseAmount: string;
  YestodayLeaseAmount: string;
  TodayRefoundAmount: string;
  YestodayRefoundAmount: string;
};

export interface AnalysisData {
  salesData: DataItem[];
}

export declare namespace ShopDashboard {
  type StatisticItem = {
    todayLeasePrice: number;
    todayNewProduct: number;
    todaySellPrice: number;
    todaySellProduct: number;
    yesterdayLeasePrice: number;
    yesterdayNewProduct: number;
    yesterdaySellPrice: number;
    yesterdaySellProduct: number;
  };

  type todayColumn = {
    shopName: string;
    totalPrice: number;
  };

  type yearColumn = {
    datetime: string;
    totalPrice: number;
  };
}
