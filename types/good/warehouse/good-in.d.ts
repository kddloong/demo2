export declare namespace GoodIn {
  interface GoodInItem {
    id: string;
    memo: string;
    operatorName: string;
    orderNo: string;
    returnAdd: string;
    source: string;
    status: string;
    supplierId: string;
    otherOrderNo: string;
    warehouseId: string;
  }

  type GoodInListItem = GoodInItem & NormalResponseField;

  /**
   * 创建订单的必填项
   */
  interface PushCreateGoodIn {
    supplierId: string;
    warehouseId: string;
  }

  /**
   * 生成订单返回的字段
   * 或者
   * 获取订单信息返回的字段
   */
  type CreateGoodInOrderInfo = {
    id: string;
    memo: string;
    operatorName: string;
    orderNo: string;
    returnAdd: string;
    source: string;
    status: string;
    otherOrderNo: string;
  } & NormalResponseField &
    PushCreateGoodIn;

  /**
   * 保存入库订单下商品的参数
   */
  interface GoodInDetailItem {
    barCode: string;
    num: number;
    orderId: string;
    price: string;
    productId: string;
    supplierId: string;
    unit: string;
    warehouseId: string;
    id: string;
  }

  /**
   * 入库订单, 入商店订单下商品list
   */
  interface GoodInDetailShowItem extends TypeUtil.NormalResponseField {
    id: string;
    price: number;
    num: number;
    orderId: string;
    productId: string;
  }

  /**
   * 扫描条码入库 请求参数
   */
  interface AddGoodItemByDevice {
    orderId: string;
    barCode: string;
  }

  /**
   * 扫描条码入库的返回结果
   */
  interface AddGoodItemByDeviceFailResult extends RequestData {
    data: string;
  }

  interface AddGoodInGood {
    barCode: string;
    orderId: string;
    price: number;
    num: number;
  }

  /**
   * 将扫描的条码(已入商品表, 未入供应商产品表) 放入供应商产品表并入库 参数
   */
  type AddGoodInGoodToSupplierGoodItem = AddGoodInGood;

  /**
   * 将扫描的条码(未入商品表) 放入商品表
   */
  interface AddGoodInGoodToGoodListItem extends AddGoodInGood {
    productBrandId: string;
    productName: string;
    productTypeId: string;
    unit: string;
  }

  /**
   * 修改入库订单数量
   */
  interface ModifyItem {
    num: number;
    orderId: string;
    productId: string;
  }
}

export declare namespace GoodsInWarehouse {
  type SearchGoodsInWarehouseParams = {
    warehouseId: string;
    productId: string;
  };

  type GoodsInWarehouseItem = {
    num: number;
    barcode: string;
    id: string;
    // '0' 是不超过, '1'超过, 需要标红
    isThresholdExceeded: string;
    productBrand: string;
    productBrandName: string;
    productName: string;
    productTypeId: string;
    productTypeName: string;
    thresholdValue: number;
    warehouseName: string;
  } & SearchGoodsInWarehouseParams;

  type GoodInWarehouseListItem = GoodsInWarehouseItem & NormalResponseField;
}
