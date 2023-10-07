export declare namespace SystemMessage {
  interface SystemMessageDetail {
    title: string;
    content: string;
  }

  type UnreadAnnouncementDetail = {
    content: string;
    id: string;
    status: string;
    title: string;

    type: string;
  };
  interface UnreadDiffMessage {
    announcement: UnreadAnnouncementDetail[];
    // 公告未读条数
    annNum: number;
    messages: [];
    // 消息未读条数
    mesNum: number;
    notices: [];
    // 通知未读条数
    notNum: number;
    // 总未读条数
    totalNum: number;
  }
}
