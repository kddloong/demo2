import { get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { MemberUser } from '../../../../types/member/member/member';
import { TypeUtil } from 'types/utils';
import { MemberUserInfo } from '../../../../types/member/member/user-info';

export async function fetchInvestCardByMemberId(
  memberId: string,
): Promise<TypeUtil.RequestResult<MemberUserInfo.BaseUserInfoItem[]>> {
  return get(`/venue-service/${version}/mem/member/findMemberCardList/${memberId}`, {});
}

/**
 * 根据加密卡号 获取 会员信息
 */
export async function fetchMemberInfoByEncryptionNo(
  encryptionCardNo: string,
): Promise<MemberUser.MemberUserListItem> {
  return get(`/venue-service/${version}/mem/member/detailByEncryptionCardNo`, { encryptionCardNo });
}

/**
 * 将会员与实体卡绑定
 * @param icCardId ic卡序列号
 * @param memberId
 */
export async function bindCardToMember(
  icCardId: string,
  memberId: string,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/mem/member/bind`, { icCardId, memberId });
}
