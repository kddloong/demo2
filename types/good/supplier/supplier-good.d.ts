import type { NormalResponseField } from '@/type/data';

export declare namespace SupplierGood {
  interface SupplierGoodItem {
    id: string;
    price: number;
    productId: string;
    supplierId: string;
  }

  type SupplierGoodListItem = SupplierGoodItem & NormalResponseField;

  type SaveGoodsDetail = {
    price: number;
    productId: string;
  };

  type SaveGoodsList = {
    supplierId: string;
    details: SaveGoodsDetail;
  };

  type UpdateGoodPrice = {
    price: number;
    id: string;
  };

  type SearchGoodInfo = {
    supplierId: string;
    barCode?: string;

    productName?: string;
  };
}
