export type DeveloperCertFormDataType = {
  //   企业名称
  enterpriseName: string;
  //   统一信用代码号
  license_no: string;
  //   企业地址
  enterprise_address: string;
  //   联系人姓名
  devName: string;
  //   联系人电话
  contactsPhone: string;
  //   联系人邮箱
  contactsEmail: string;
  //   开发者类型
  developerType: string;
  //   核心业务
  enterpriseMsg: string;
  //   营业执照图片地址
  licenseImgUrl: string;
};
// 保存认证之后后台返回的数据格式
export type DeveloperCertResultData = {
  enterpriseTime: any;
  contactsEmail: string;
  contactsImgUrl: string;
  contactsPhone: string;
  createDate: string;
  createName: string;
  deptId: string;
  devCardNo: string;
  devName: string;
  developerEquipment: string;
  developerType: string;
  enterpriseAddress: string;
  addressDetail: string;
  enterpriseMsg: string;
  enterpriseName: string;
  id: string;
  identity: string;
  licenseImgUrl: string;
  logo: string;
  // 统一信用代码
  licenseNo: string;
  lockReason: string;
  auditDesc: string;
  // 认证状态 :  0：未提交   1：审核中   2：成功   3：失败
  status: string;
  submitTime: string;
  updateDate: string;
  updateName: string;
  userId: string;
};
