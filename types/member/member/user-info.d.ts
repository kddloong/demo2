import type { InvestCardTypeEnum } from '@/type/member/types';
import type { SetState } from '@/type/useState';

export declare namespace MemberUserInfo {
  interface IBaseProps {
    memberId: string;
  }

  interface MemberInfoProps extends IBaseProps {
    noPadding?: boolean;
    getCard?: TypeUtil.SetState<MemberUserInfo.BaseUserInfoItem | undefined>;
    cardType?: InvestCardTypeEnum | string;
    noChoseEffect?: boolean;
  }

  type MemberUserInfoItem = {
    balance: string;
    createDate: string;
    id: string;
    name: string;
    giveBalance: number;
    giveNumber: number;
    memberId: string;
    number: string;
    type: string;
    publicBalance: number;
    publicNumber: number;
    venueIds: string;
    value: string;
    expireDay: string;
    label: string;
    backgroundColor: string;
    //折扣
    sales: number;
    phoneNo: string;
  };
  /**
   * 查看会员的会员卡信息返回的信息
   */
  type BaseUserInfoItem = Omit<MemberUserInfoItem, 'value' | 'label'>;

  type BaseInfoForPay = BaseUserInfoItem & {
    people: string;
    phoneNo: string;
  };

  type MemberTableProps = {
    memberId: string;
  };

  type MemberCardListItem = MemberUserInfoItem & {
    people: string;
  } & { venueName: string };

  type MemberBaseInfo = {
    name: string;
    sex: string;
    status: string;
    encryptionCardNo: string;
    phoneNo: string;
    lastLoginTime: string;
  };
}
