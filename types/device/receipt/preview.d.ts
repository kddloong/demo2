export declare namespace ReceiptModelDetail {
  type ModelDetailItem = {
    configId: string;
    id: string;
    content: string;
    sort: number;
    type: string;
  };

  interface ModelItem {
    //模板内容
    content: string;
    //模板编号
    docNo: string;
    //主键
    id: string;
    //是否启用
    isStart: string;
    //模板名称
    name: string;
  }

  type ModelListItem = ModelItem & BaseResponseField;
}
