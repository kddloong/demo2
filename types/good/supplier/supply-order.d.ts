declare namespace SupplyOrder {
  type SupplyOrderItem = {
    id: string;
    memo: string;
    orderNo: string;
    status: string;
    supplierId: string;
  };

  type CreateSupplyOrder = {
    supplierId: string;
    status: string;
  };

  /**
   * 保存供货单商品
   */
  type SupplyOrderGood = {
    barCode: string;
    id?: string;
    num: number;
    price: number;
    productId: string;
    orderNo: string;
  };

  /**
   * 修改供货单上商品的数量
   */
  type UpdateGoodNum = {
    num: number;
    orderId: string;
    productId: string;
    price: number;
  };
}
