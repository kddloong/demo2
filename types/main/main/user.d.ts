export declare namespace User {
  interface UserItem {
    userCode: string;

    userName: string;

    password: string;

    status: string;

    nickName: string;

    realName: string;

    avatar: string;

    email: string;

    phone: string;

    birthday: string;

    sex: string;

    roleId: string;

    deptId: string;

    isDeleted: string;

    loginCount: number;

    lastLoginTime: string;

    signedUp: string;

    lastLoginIp: string;

    lastLoginDevice: string;

    lastLoginBrowser: string;

    type: string;

    id: string;
  }

  interface UserRole {
    roleIds: string;
    roleNames: string;
  }

  // 重置选中用户的密码
  interface UserPassWord {
    userId: string;
    password: string;
    repassword: string;
  }

  //修改当前用户的密码
  interface ChangeUserPassword extends UserPassWord {
    oldPassword: string;
  }
}
