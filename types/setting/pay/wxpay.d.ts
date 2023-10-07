export declare namespace WxpayConfig {
  type WxpayConfigSetting = {
    //微信appId
    appId: string;
    //证书名称
    certFileName: string;
    fileName: string;
    //证书线上地址
    certUrl: string | UploadFile;
    //主键
    id: string;
    //是否启用 0：不启用 1：启用
    isStart: string;
    //支付key
    keyKey: string;
    //小程序商户号
    mchId: string;
  };
}
