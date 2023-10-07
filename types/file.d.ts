export declare namespace File {
  interface FileInfo {
    id: string;
    name: string;
    path: string;
    relatedId: string;
    // 创建人Id
    createUserId?: string;
    // 来源
    source?: string;
  }
}
