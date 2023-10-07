export declare namespace WCardWarehouse {
  type WCardWarehouseItem = {
    cardNo: string;
    type: string;
    status: string;
    inTime: string;
    outTime: string;
    memo: string;
    id: string;
    encryptionCardNo: string;
  };

  type WCardWarehouseListItem = WCardWarehouseItem & NormalResponseField;

  type createCardIn = {
    id: string;
    // 加密卡号
    cardNo: string;

    // 实体卡号
    encryptionCardNo: string;

    // 	0是IC卡 1是手环
    type: string;
    memo?: string;
    inTime?: string;
    outTime?: string;
    //	状态不能为空 0：已入库 1：已使用 2：已作废
    status?: string;
  };
}
