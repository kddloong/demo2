export declare namespace FinanceWxPay {
  interface WxPayOrderInfo {
    // 账户ID
    accountId: string;
    // attach
    attach: string;
    // 付款码
    authCode: string;
    // 银行
    bankType: string;
    // 业务系统订单号
    bizOrderNo: string;
    // 商品描述
    body: string;
    // 商品详情
    detail: string;
    // 支付结束时间
    endTime: string; // 日期时间格式
    // 错误代码
    errCode: string;
    // 错误信息
    errMsg: string;
    // 货币类型
    feeType: string;
    // ic
    id: string;
    // 商户号
    mchId: string;
    // 订单号
    outTradeNo: string;
    // IP地址
    spBillCreateIp: string;
    // 订单状态
    status: string; // 0:创建1:提交失败2:提交成功3:支付成功4:支付失败5:订单退款6退款失败
    // 是否关注
    subscribe: string;
    // 交易发起时间
    timeStart: string;
    // 订单总金额
    totalAmount: number;
  }
}
