export type CurrentUser = {
  // unreadCount 实际并不存在
  unreadCount: number;
  avatar: string;
  clientId: string;
  deptId: string;
  email: string;
  id: string;
  nickName: string;
  password: string;
  phone: string;
  realName: string;
  roleId: string;
  sex: string;
  status: string;
  tenantId: string;
  userCode: string;
  userName: string;
  access: unknown;
  logo: string;
  // 为空则没绑定微信
  unionId: string;
  // 为空则没绑定QQ
  qqUnionId: string;
};
