export declare namespace WechatUser {
  interface GetCustomerByPhoneItem {
    name?: string;
  }

  // 获取当前账号的微信绑定情况
  interface WechatUserItem {
    //头像
    avatarUrl: string;
    //城市
    city: string;
    //国家
    country: string;
    //性别
    gender: string;
    //主键
    id: string;
    //
    lastLoginTime: string;
    //微信昵称
    nickName: string;
    //小程序openId
    openId: string;
    //手机号
    phoneNo: string;
    //省份
    province: string;
    //用户状态
    status: string;
  }

  interface WeChatUserManageParams {
    phoneNo: string;
  }
}
