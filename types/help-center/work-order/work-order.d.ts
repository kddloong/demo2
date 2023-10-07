export declare namespace WorkOrderDesc {
  interface DescDetail {
    content: string;
    phone: string;
    email: string;
    orderNo: string;
    id: string;
    status: string;
    submitTime: string;
    title: string;
    userId: string;
  }

  // 后台接口--查询工单信息--返回的数据类型
  interface DescDetailData {
    clientId: string;
    content: string;
    createDate: string;
    email: string;
    id: string;
    orderNo: string;
    phone: string;
    status: string;
    submitTime: string;
    title: string;
    updateDate: string;
    updateName: string;
    userId: string;
  }

  interface ProcessDetail {
    clientId: string;
    content: string;
    createDate: string;
    createName: string;
    dealTime: string;
    id: string;
    type: string;
    updateDate: string;
    updateName: string;
    workOrderId: string;
  }
}

export type WorkOrderListType = {
  content: string;
  email: string;
  id: string;
  orderNo: string;
  phone: string;
  status: string;
  submitTime: string;
  title: string;
  userId: string;
};
