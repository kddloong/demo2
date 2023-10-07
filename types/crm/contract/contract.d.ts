export declare namespace Contract {
  interface ContractInfo {
    // 	合同金额
    amount: number;
    // 商机id
    businessId: string;
    // 商机名称
    businessName: string;
    // 签约状态
    checkStatus: string;
    // 	公司经办人id
    companyUserId: string;
    // 	公司经办人名称
    companyUserName: string;
    // 	签约人id
    contactId: string;
    // 	签约人名称
    contactName: string;
    // 	合同编号
    contractNo: string;
    // 合同类型
    contractType: string;
    createDate: string; // string(date-time)
    // 客户id
    customerId: string;
    // 客户名称
    customerName: string;
    // 合同到期时间
    endTime: string; // string(date-time)
    id: string;
    // 	已开票金额
    invoiceMoney: number;
    lastContent: string;
    lastTime: string;
    // 合同名称
    name: string;
    // 下单时间
    orderDate: string; // string(date-time)
    // 所属部门id
    ownerDeptId: string;
    // 所属部门名称
    ownerDeptName: string;
    // 负责人id
    ownerUserId: string;
    // 	负责人名称
    ownerUserName: string;
    // 已收款金额
    receivedMoney: number;
    remark: string;
    star: number;
    // 合同开始时间
    startTime: string;
    // 状态
    status: string;
    // 未收款金额
    unreceivedMoney: number;
  }

  interface ContractTransferParam {
    ids?: string;
    // 负责人名称
    name: string;
    // 负责人id
    userId: string;
  }

  interface ContractDownloadParams {
    key: string;
    type: number;
  }
  interface ContractPreviewParams {
    content: string;
    type: number;
  }

  interface ContractPrintParams {
    dataId: string;
    templateId: number;
  }
}
