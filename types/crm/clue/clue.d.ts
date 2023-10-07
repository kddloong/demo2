import { changeCustomerDealStatus } from '@/services/crm/customer/customer';

export declare namespace Clue {
  // 新增/表格
  interface ClueInfo {
    // 详细地址
    detailAddress: string;
    //   地址
    address: string;
    // 创建时间
    createDate: string;
    // 邮箱
    email: string;
    // 主键
    id: string;
    // 客户行业
    industry: string;
    // 	最后跟进记录
    lastContent: string;
    // 最后跟进时间
    lastTime: string;
    // 客户级别
    level: string;
    // 手机
    mobile: string;
    // 线索名称
    name: string;
    // 下次联系时间
    nextTime: string;
    // 所属部门id
    ownerDeptId: string;
    // 所属部门名称
    ownerDeptName: string;
    // 负责人id
    ownerUserId: string;
    // 负责人名称
    ownerUserName: string;
    // 备注
    remark: string;
    // 线索来源
    source: string;
    // 状态
    status: string;
    // 电话
    telephone: string;
    star: number;
    // 自定义标签
    // todo 定义类型
    tags: any;
  }

  // 线索转移
  interface TransferParams {
    // 线索id 多个
    ids?: string;
    // 负责人id
    userId: string;
    // 线索id 单个
    clueId?: string;
    // 负责人名称
    name: string;
  }
}
