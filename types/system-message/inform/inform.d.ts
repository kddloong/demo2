export declare namespace Inform {
  interface InformDetail {
    title: string;
    content: string;
    id: string;
    releaseTime: string;
    category?: string;
    detailId?: string;
    isRead?: string;
    readTime?: string;
    auditLogId?: string;
  }

  interface InformLogType {
    auditTime: string;
    description: string;
    id: string;
    type: string;
  }
}
