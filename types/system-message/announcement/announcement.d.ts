export declare namespace Announcement {
  interface AnnouncementParams {
    // 内容
    content: string;
    id?: string; // 无：保存   有：修改
    // 标题
    title: string;
  }

  // 公告详情
  interface AnnouncementDetail {
    releaseTime: string;
    // 状态 0:历史公告 1：当前公告
    status: string;
    // 1： 企业  0： 平台
    type: string;
    id: string;
    content: string;
    title: string;
  }
  interface AnnouncementCate {
    web: any;
    admin: any;
  }

  interface ReaderType {
    avatar: string;
    // 姓名
    realName: string;
    // 账号
    userName: string;
    //  手机
    phoneNo: string;
    nickName: string;
    readTime: string;
  }
}
