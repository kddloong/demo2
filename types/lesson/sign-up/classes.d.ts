export namespace ClassesSignUp {
  type ClassesSignUpItem = {
    //实际金额
    actPrice: number;
    //
    billNo: string;
    //主键
    id: string;
    //关联会员
    memberId: string;
    //
    name: string;
    //关联微信用户OPENID
    openId: string;
    //支付时间
    payTime: number;
    //支付方式
    payType: string;
    //
    phoneNo: string;
    //支付金额
    price: number;
    //退款金额
    refundPrice: number;
    //
    refundReason: string;
    //
    sex: string;
    //报名单号
    signUpNo: string;
    //报名时间
    signUpTime: number;
    //报名来源 0：PC手动报名 1：场馆小程序
    source: string;
    //状态
    status: string;
    //关联班级
    teamId: string;
  };
}
