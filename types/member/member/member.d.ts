import { ConsumptionTypeEnum } from '@/utils/enums';
import { UploadFile } from 'antd/es/upload/interface';
import { BaseResponseField } from '../../utils';

export declare namespace MemberUser {
  /**
   * 会员信息字段
   */
  type MemberUserItem = {
    //地址
    address: string;
    //头像
    avatarUrl: string | UploadFile[];
    //生日
    birthDay: number;
    //会员编号
    cardNo: string;
    //邮箱
    email: string;
    //主键
    id: string;
    //身份证号
    idCard: string;
    //最近登录时间
    lastLoginTime: number;
    //备注
    memo: string;
    //会员姓名
    name: string;
    //会员民族
    nation: string;
    //手机号
    phoneNo: string;
    //会员性别
    sex: string;
    //状态 0：禁用 1：正常
    status: string;
    // 加密卡号
    encryptionCardNo: string;
    // 实体卡状态
    physicalCardStatus: string;
    isIssue: string;
    appAvatarUrl: string;
    height: number;
    nickName: string;
    openId: string;
    source: string;
    weight: number;
    // 学历
    educationBackground: string;
    // 毕业院校
    graduateSchool: string;
    //   兴趣爱好
    interest: string;
    //   婚姻状况
    matrimony: string;
    //   籍贯
    nativePlace: string;
    //   储值卡余额
    balance: string;
    //   期限卡到期时间
    expireDay: string;
    //   计次卡剩余次数
    number: string;
  };

  /**
   * 会员列表字段
   */
  type MemberUserListItem = MemberUserItem & BaseResponseField;

  type SaveMemberUserInfo = Omit<MemberUserItem, 'lastLoginTime'>;

  type InvestPayCoreParams = {
    configId: string;
    memberId: string;
    memo: string;
    orderNo: string;
    consumptionType: ConsumptionTypeEnum | string;
    venueId: string;
  };

  /**
   * 会员卡余额支付
   */
  type BalanceConsumptionParams = {
    price: number;
  } & InvestPayCoreParams;

  /**
   * 实体卡操作类型
   */
  type EntityCardActionType = 'reportLoss' | 'supplementCard' | 'returnCard';
  /**
   * 实体卡操作的参数
   */
  type EntityCardActionParams = {
    memberId: string;
    // 实体卡号
    encryptionCardNo: string;
    cardNo: string;
  };

  /**更新人脸信息的参数*/
  type UpdateFaceParams = {
    //会员卡号
    cardNo: string;
    memberId: string;
    imageUrl: string;
  };

  // 实体卡配置参数
  type EntityConfigParams = {
    // 设备编号
    deviceNo: string;
    // MAC地址
    macAddress: string;
    // 串口号
    serialPort: string;

    isStart?: string;
  };
}

export declare namespace Member {
  type SearchInvestCardInfoParams = {
    param: string;
    venueId?: string;
    type?: string; //0:商品售卖 1：商品出租 2：赛事报名 3：培训报名
  };
}
