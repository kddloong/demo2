export declare namespace Customer {
  interface CustomerInfo {
    address: string;
    createDate: string;
    // 成交状态 0： 未成交   1： 已成交
    dealStatus: string;
    email: string;
    id: string;
    industry: string;
    isLock: number;
    lastContent: string;
    lastTime: string;
    level: string;
    mobile: string;
    name: string;
    nextTime: string;
    // 所属部门id
    ownerDeptId: string;
    // 所属部门名称
    ownerDeptName: string;
    // 负责人id
    ownerUserId: string;
    // 负责人名称
    ownerUserName: string;
    remark: string;
    source: string;
    star: number;
    status: string;
    tags: string;
    telephone: string;
    updateDate: string;
    website: string;
    // 首要联系人
    mainContactId: string;
  }

  interface TransferParams {
    // 线索id 多个
    ids?: string;
    // 负责人id
    userId: string;
    // 线索id 单个
    clueId?: string;
    // 负责人名字
    name: string;
  }

  interface AllocateParams {
    // 线索id 多个
    ids?: string;
    // 负责人id
    userId: string;

    // 负责人名字
    name: string;
  }

  // 更改成交状态参数
  interface CustomerDealStatus {
    // 0 未成交  1 已成交
    dealStatus: number;
    ids: string;
  }

  //  设置首要联系人参数
  interface MainContactParams {
    // 联系人id
    contactId: string;
    // 客户id
    customerId: string;
  }

  interface MainContactAddress {
    // 联系人id
    addressId: string;
    // 客户id
    customerId: string;
  }

  interface CustomerContactAddress {
    address: string;
    addressType: string;
    contactName: string;
    customerId: string;
    id: string;
    isMain: string;
    postalCode: string;
    remark: string;
    telephone: string;
  }
}
