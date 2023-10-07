export declare namespace MessageRecord {
  interface MessageRecordItem {
    //发送的内容
    content: string;
    //主键
    id: string;
    //发送的手机号
    phoneNo: string;
    //发送时间
    sendTime: number;
    //模板CODE种类，列如1001为充值短信CODE模板
    smsTemplate: string;
    //状态 0：未发送 1：已发送
    status: string;
    //关联短信模板的ID
    templateId: string;
  }

  interface MessageRecordStatistic {
    // 失败条数
    fail: string;
    // 月发送条数
    month: string;
    // 成功发送数
    success: string;
    // 总发送数
    total: string;
    // 今日发送条数
    today: string;
  }
}
