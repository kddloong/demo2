export declare namespace Invoice {
  // 用于发票列表
  interface InvoiceListDetail {
    // 状态 0未开票、1已开票
    status: string;
    // 合同金额

    contractAmount: number;
    // 合同id
    contractId: string;
    // 合同编号
    contractNo: string;
    // 创建时间
    createDate: string; // string(date-time)
    // 客户id
    customerId: string;
    // 客户名称
    customerName: string;
    // id
    id: string;
    // 开票金额
    invoiceAmount: number;
    // 开票日期
    invoiceDate: string; // string(date-time)
    // 发票编号
    invoiceNo: string;
    // 发票号码
    invoiceNumber: string;
    // 开票类型
    invoiceType: string;
    // 物流单号
    logisticsNumber: string;
    // 所属部门id
    ownerDeptId: string;
    // 所属部门名
    ownerDeptName: string;
    // 负责人id
    ownerUserId: string;
    // 负责人名称
    ownerUserName: string;
    // 实际开票日期
    realInvoiceDate: string; // string(date-time)
    // 备注
    remark: string;
    // 是否关注
    star: number; // integer(int32)
    // 更新时间
    updateDate: string; // string(date-time)
  }
  // 保存发票
  interface SaveInvoiceInfo {
    // 合同金额
    contractAmount: number;
    // 邮寄地址
    contactAddress: string;
    // 联系方式
    contactMobile: string;
    // 联系人
    contactName: string;
    // 合同id
    contractId: string;
    // 客户id
    customerId: string;
    // 开户账号
    depositAccount: string;
    // 开票地址
    depositAddress: string;
    // 开户行
    depositBank: string;
    // 主键
    id: string;
    // 发票金额
    invoiceAmount: number;
    // 开票日期
    invoiceDate: string;
    // 发票申请编号
    invoiceNo: string;
    // 发票号码
    invoiceNumber: string;
    // 开票抬头
    invoiceTitle: string;
    // 开票类型
    invoiceType: string;
    // 物流单号
    logisticsNumber: string;
    // 所属部门id
    ownerDeptId: string;
    // 所属部门名称
    ownerDeptName: string;
    // 负责人id
    ownerUserId: string;
    // 负责人名称
    ownerUserName: string;
    // 实际开票日期
    realInvoiceDate: string;
    // 备注
    remark: string;
    // 状态 0为开票、1已开票
    status: string;
    // 纳税人识别号
    taxNumber: string;
    // 电话
    telephone: string;
    // 抬头类型
    titleType: string;
    //
    star: number;
  }

  interface InvoiceTransferParams {
    ids?: string;
    // 负责人名称
    name: string;
    // 负责人id
    userId: string;
  }
}
