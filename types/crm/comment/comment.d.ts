export declare namespace Comment {
  type CommentChild = {
    relateId?: string;
    commentMainId?: string;
    content: string;
    id?: string;
    replyId: string;
    status?: string;
    // 评论时间
    time?: string;
    // 评论人ID
    userId?: string;
    // 被回复人
    replyUserId: string;
  };
  interface CommentInfo {
    relateId?: string;
    commentMainId?: string;
    content: string;
    id?: string;
    replyId: string;
    status?: string;
    // 评论时间
    time?: string;
    // 评论人ID
    userId?: string;
    // 被回复人
    replyUserId: string;
    commentChildren?: CommentChild[];
  }
}
