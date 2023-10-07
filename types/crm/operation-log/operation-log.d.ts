export declare namespace OperationLog {
  interface OperationLogInfo {
    actionId: string;
    actionTime: string;
    content: string;
    createDate: string;
    createName: string;
    detail: string;
    id: string;
    // 1 线索 2 客户 3 联系人 4 商机 5 合同 6 回款 7 回款计划 8 市场活动 9 发票
    type: string;
  }

  interface OperationLogParams {
    actionId: string;
    // 1 线索 2 客户 3 联系人 4 商机 5 合同 6 回款 7 回款计划 8 市场活动 9 发票
    type: string;
  }
}
