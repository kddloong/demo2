export declare namespace GoodOut {
  type SearchGoodOutOrderParams = {
    operatorName: string;
    orderNo: string;
    status: string;
  };

  type GoodOutItem = {
    id: string;
    shopId: string;
    supplierId: string;
    time: string;
    warehouseId: string;
  } & SearchGoodOutOrderParams;

  //出库订单列表的字段
  type GoodOutListItem = GoodOutItem & NormalResponseField;

  // 创建出库订单的参数
  type CreateGoodOutOrderParams = {
    id: string;
    operatorName: string;
    venueId: string;
    status: string;
    time: string;
    warehouseId: string;
    //目标 0商店 1仓库 2其他
    destination: string;
    reason: string;
    reasonOther?: string;
  };

  type GoodsInGoodOutDetailItem = {
    id: string;
    num: number;
    productId: string;
  } & AddGoodItemByDevice;

  // 出库订单商品列表的字段
  type GoodsInGoodOutDetailListItem = GoodsInGoodOutDetailItem &
    NormalResponseField &
    SaasResponseField;

  // 出库扫码传的参数
  type AddGoodItemByDevice = {
    outWarehouseId: string;
  } & BarCode;
}
