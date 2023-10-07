export declare namespace Linkman {
  interface LinkmanInfo {
    id: string;
    customerId: string; // 客户id
    customerName: string; // 客户名称
    email: string; // 邮箱
    name: string; // 联系人名称
    mobile: string; // 手机
    address: string; // 地址
    createDate?: string; // 创建时间 (date-time string)
    lastContent: string; // 最后跟进记录
    lastTime: string; // 最后跟进时间 (date-time string)
    nextTime: string; // 下次联系时间 (date-time string)
    ownerDeptId: string; // 所属部门id
    isKey: string; // 是否关键决策人
    ownerDeptName: string; // 所属部门名称
    ownerUserId: string; // 负责人id
    ownerUserName: string; // 负责人名称
    post: string; // 职务
    remark: string; // 备注
    sex: string; // 性别 (string)
    star: number; // 是否关注 (integer)
    status: string; // 状态
    telephone: string; // 电话
    updateDate?: string; // 更新时间 (date-time string)
    // businessId?: string // 商机id
  }

  type LinkInfoMergeExtra<T> = LinkmanInfo & T; // 用于商机里新建联系人的类型

  interface TransferParams {
    // id 多个
    ids?: string;
    // 负责人id
    userId: string;
    // id 单个
    clueId?: string;
    //
    name: string;
  }

  interface TinyFormInfo {
    id: string;
    name: string;
    post: string;
    isMain?: string;
    telephone?: string;
    contactId?: string;
  }
}
