export declare namespace FinanceAlipay {
  interface AlipayOrderInfo {
    // 阿里分配支付appId
    appId: string;
    // 附加数据，用来判断订单来源
    attach: string;
    // 付款条码b扫c
    authCode: string;
    // 订单描述
    body: string;
    // 接口错误代码
    errCode: string;
    // 接口错误信息
    errMsg: string;
    // 支付时间
    gmtPayment: string;
    // 退款时间
    gmtRefundPay: string;
    // 商户操作员编号
    operatorId: string;
    // 原始订单号，支付时用的不是这个订单号
    orderNo: string;
    // 传给阿里支付的订单号
    outTradeNo: string;
    // PID
    pid: string;
    // 卖家支付宝账号ID
    sellerId: string;
    // 订单状态
    status: string; // 0:创建1:提交失败2:提交成功3:支付成功4:支付失败5:订单退款6退款失败
    // 商户门店编号
    storeId: string;
    // 业务错误代码
    subCode: string;
    // 业务错误信息
    subMsg: string;
    // 商户机具终端编号
    terminalId: string;
    // 订单总金额，单位元
    totalAmount: number;
    // 阿里内部交易号
    tradeNo: string;
  }
}
