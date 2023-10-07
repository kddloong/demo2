import { message } from 'antd';
import { bindCardToMember, fetchInvestCardByMemberId } from '@/services/member/member/user-info';
import { MemberUserInfo } from '../../../../types/member/member/user-info';
import { InvestCardTypeEnum } from '@/utils/enums';
import BigNumber from 'bignumber.js';

type BaseMemberUserInfoItem = Omit<MemberUserInfo.MemberUserInfoItem, 'value' | 'label'>;

/**
 * 根据会员卡类型, 显示不同的文字
 * @param obj
 */
export function splitByType(obj: BaseMemberUserInfoItem) {
  const type = obj.type;

  switch (type) {
    case InvestCardTypeEnum.EXPIRE_CARD:
      return { value: obj.expireDay, label: '有效期至' };
    case InvestCardTypeEnum.COUNT_CARD:
      return {
        value: new BigNumber(obj.number).plus(obj.giveNumber).plus(obj.publicNumber).toNumber(),
        label: '剩余次数',
      };
    case InvestCardTypeEnum.STORE_CARD:
      return {
        value: new BigNumber(obj.balance)
          .plus(obj.giveBalance)
          .plus(obj.publicBalance)
          .dp(2)
          .toNumber(),
        label: '余额',
      };
    default:
      return { value: '', label: '' };
  }
}

/**
 * 格式化接口数据
 * @param array
 */
export function handleCardListData(array: BaseMemberUserInfoItem[]) {
  return array.map((arr) => {
    return {
      ...arr,
      ...splitByType(arr),
    };
  });
}

/**
 * 获取会员有几张会员卡
 * @param memberId
 */
export const handleFetchInvestCardByMemberId = async (memberId: string) => {
  try {
    const result = await fetchInvestCardByMemberId(memberId);

    if (result.success) {
      return {
        success: true,
        data: handleCardListData(result.data),
      };
    } else {
      message.warning(result.msg);
      return { success: false, data: [] };
    }
  } catch (err) {
    return { success: false, data: [] };
  }
};

/**
 * 将实体卡与会员绑定
 * @date 2023-09-13
 * @param icCardId ic卡序列号
 * @param memberId
 */
export const handleBindCardToMember = async (icCardId: string, memberId: string) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await bindCardToMember(icCardId, memberId);

    hide();

    if (result.success) {
      message.success(result.msg);
      return { success: true };
    } else {
      message.warning(result.msg);
      return { success: false };
    }
  } catch (err) {
    hide();

    return { success: false };
  }
};
