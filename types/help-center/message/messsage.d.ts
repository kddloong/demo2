export interface MessageListType {
  auditLogId: '/' | string | UmiPath;
  detailId: '/' | string | UmiPath;
  category: string;
  content: string;
  id: string;
  isRead: string;
  releaseTime: string;
  title: string;
  type: string;
  userId: string;
}

export interface AuditRecordType {
  // 审核意见/描述
  description: string;
  // 审核时间
  auditTime: string;
}
