import { CLIENT_VERSION as version } from '@/utils/utils';
import { deleteRes, get, post } from '@/services/request/request_tools';
import { Member, MemberUser } from 'types/member/member/member';
import { RequestTableParam, TypeUtil } from 'types/utils';
import { MemberUserInfo } from '../../../../types/member/member/user-info';

const baseUrl = `/venue-service/${version}/mem`;

/**
 * 获取会员用户列表
 * @param params
 * @returns {Promise<unknown>}
 */
export async function getMemberUserList(
  params: RequestTableParam,
): Promise<TypeUtil.RequestTableResult<MemberUser.MemberUserListItem[]>> {
  return get(`${baseUrl}/member/list`, params);
}

/**
 * 删除会员信息
 * @param id
 */
export async function deleteMemberUser(id: string): Promise<TypeUtil.RequestResult> {
  return deleteRes(`${baseUrl}/member/${id}`, {});
}

/**
 * 执行会员卡
 * @param params
 * @param type
 */
export async function executeEntityCardAction(
  params: MemberUser.EntityCardActionParams,
  type: MemberUser.EntityCardActionType,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/mem/member/${type}`, params);
}

/**
 * 更新人脸
 * @param params
 */
export async function updateFace(
  params: MemberUser.UpdateFaceParams,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/mem/member/updateFace`, params);
}

/**
 * 根据 卡号, 加密卡号, 手机号 获取 会员基本信息
 * @param params
 */
export async function fetchMemberInfoByParams(
  params: string,
): Promise<TypeUtil.RequestResult<MemberUser.MemberUserListItem>> {
  return get(`/venue-service/${version}/mem/member/getMemberDetail`, { param: params });
}

/**
 * 根据id获取会员信息
 * @param id
 */
export async function fetchMemberUserById(
  id: string,
): Promise<TypeUtil.RequestResult<MemberUser.MemberUserListItem>> {
  return get(`/venue-service/${version}/mem/member/base/info/${id}`, {});
}

/**
 * @author ssss
 * @param params
 */
export async function balanceConsumption(
  params: MemberUser.BalanceConsumptionParams,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/mem/member/consumptionBalance`, params);
}

/**
 *
 * @param params
 */
export async function fetchInvestCardInfoByPhoneNoAndVenueId(
  params: Member.SearchInvestCardInfoParams,
): Promise<TypeUtil.RequestResult<MemberUserInfo.BaseInfoForPay>> {
  return get(`/venue-service/${version}/mem/member/getMemberBalance`, params);
}

/**
 * 根据会员信息和场馆id获取会员卡设置信息
 * @param params
 */
export async function fetchInvestCardInfoByPhoneNoAndVenueIdNew(
  params: Member.SearchInvestCardInfoParams,
): Promise<TypeUtil.RequestResult<MemberUserInfo.BaseInfoForPay[]>> {
  return get(`/venue-service/${version}/mem/member/findMemCardList`, params);
}

/**
 * 根据手机号获取用户信息
 * @param phone
 */
export async function searchUserInfoByPhoneNo(
  phone: string,
): Promise<TypeUtil.RequestResult<MemberUser.MemberUserListItem>> {
  return get(`/venue-service/${version}/mem/member/detailByPhone`, { phone });
}

/**
 * 读卡器设备下拉框显示
 */
export async function getReadCardListSelect(): Promise<TypeUtil.RequestSelectData> {
  return get(`/netty-service/${version}/read/card/device/readCardList`);
}

/**
 * 同步企业读卡器配置
 * @param params
 */
export async function saveEntityCardConfig(
  params: MemberUser.EntityConfigParams,
): Promise<TypeUtil.RequestResult> {
  return post(`/netty-service/${version}/read/card/device/update`, params);
}

/**
 * 查看读卡器配置的cookie剩余时间
 */
export async function getCookieRestTime(): Promise<TypeUtil.RequestResult> {
  return get(`/netty-service/${version}/read/card/device/cookie`);
}
