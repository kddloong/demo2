export declare namespace Opportunity {
  interface OpportunityInfo {
    // 	商机金额
    amount: string;
    customerId: string;
    id: string;
    lastContent: string;
    lastTime: string;
    name: string;
    nextTime: string;
    ownerDeptId: string;
    // 所属部门名称
    ownerDeptName: string;
    ownerUserId: string;
    // 负责人名称
    ownerUserName?: string;
    // 预计成交日期
    predictTime: string;
    remark: string;
    star: number;
    mainContactId: string;
  }

  type OpportunityMergeExtra<T> = OpportunityInfo & T;

  interface OpportunityTransferParams {
    // 商机id列表
    ids?: string;
    // 负责人名称
    name: string;
    // 负责人id
    userId: string;
  }

  interface MainLinkmanParams {
    businessId: string;
    contactId: string;
  }

  interface RelateLinkman {
    businessIds: string;
    contactIds: string;
  }

  interface InnerOpportunityInfo {
    businessName: string;
    contactName: string;
    customerName: string;
    telephone: string;
    businessId: string;
  }

  // 关联联系人展示列表接口所需参数
  interface RelateLinkmanParams {
    customerId: string;
    businessId: string;
  }
}
