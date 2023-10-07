import { Comment } from '../comment/comment';

export declare namespace Activity {
  interface ActivityInfo {
    activityType: string;
    // 活动类型id
    activityTypeId: string;
    // 跟进方式（字典）
    category: string;
    // 	跟进内容
    content: string;
    // 创建时间
    createDate: string;
    // 文件名称
    fileName: string;
    // 文件路径
    filePath: string;
    id: string;
    // 下次联系时间
    nextTime: string;
    // 回复数量
    replyNum: string;
    // 更新时间
    updateDate: string;

    commentArr: Comment.CommentInfo[];
  }

  interface ActivityParams {
    activityType: string;
    // 活动类型id
    activityTypeId: string;
  }
}
