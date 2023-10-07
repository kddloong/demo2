import type { InventoryEnum } from '@/type/good/inventory/types';

export declare namespace StockInventory {
  type ShopInventoryListItem = {
    todayDate: string;
    venueId: string;
    memo: string;
    operatorName: string;
    status: string;
    exceptionDescription: string;
  } & FetchInventoryCheckParams;

  type FetchInventoryCheckParams = {
    type: InventoryEnum;
    id: string;
    timeFrom: string;
    timeTo: string;
  };
}

export declare namespace DoStockInventory {
  type StockInventoryItem = {
    actualNum: number;

    clientId: string;
    createDate: string;
    createName: string;

    productId: string;
    tenantId: string;
    updateName: string;
    venueId: string;
    versions: number;
  } & StockNumParams;

  type StockNumParams = {
    id: string;
    num: number;
    checkId: string;
    productId: string;
  };

  type ChangeStockNumParams = StockNumParams & { type: string; exceptionDescription: string };
}
