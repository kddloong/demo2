export declare namespace WechatUser {
  interface GetCustomerByPhoneItem {
    name?: string;
  }

  // 获取当前账号的微信绑定情况
  interface WechatUserItem {
    avatarUrl: string;
    city: string;
    country: string;
    gender: string;
    id: string;
    lastLoginTime: string;
    nickName: string;
    openId: string;
    phoneNo: string;
    province: string;
    createDate?: string;
    status: string;
  }

  interface WeChatUserManageParams {
    phoneNo: string;
  }
}
