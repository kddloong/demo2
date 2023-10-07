export declare namespace MyMessage {
  // 消息分组
  interface GroupMessageInfo {
    // 描述
    description: string;
    // 主键
    id: string;
    // 名称
    name: string;
    // 排序
    sort: number;
    // 状态 0：停用 1：启用
    status: string;
    // 类型 0：默认发送 1：配置发送
    type: string;
  }
}
