import { CLIENT_VERSION as version } from '@/utils/utils';
import { get, post } from '@/services/request/request_tools';
import { LabelValueItem, PayResult, TypeUtil } from 'types/utils';
import { MemberUser } from 'types/member/member/member';
import { InvestCard } from '../../../../types/member/invest/invest';
import { InvestCardTypeEnum } from '@/utils/enums';

/**
 * 保存会员信息
 * @param params
 * @returns {Promise<unknown>}
 */
export async function saveMemberUserInfo(
  params: MemberUser.SaveMemberUserInfo,
): Promise<TypeUtil.RequestResult<string>> {
  return post(`/venue-service/${version}/mem/member/save`, params);
}

/**
 * 根据场馆id获取可用的会员卡卡种
 * @param venueId
 */
export async function fetchMemberConfigSelectDataByVenueId(
  venueId: string,
): Promise<TypeUtil.RequestResult<LabelValueItem[]>> {
  return get(`/venue-service/${version}/mem/config/getMemberConfigSelectByVenueId`, { venueId });
}

/**
 * 获取可用的会员卡卡种和面值
 * @param venueId
 */
export async function fetchMemberConfigDataByVenueId(
  venueId: string,
): Promise<TypeUtil.RequestResult<MemberCardConfigSetting.SaveSettingItem[]>> {
  return get(`/venue-service/${version}/mem/config/getMemberConfigByValueId`, { venueId });
}

/**
 * 获取可用的会员卡卡种和面值
 * @param venueId 场馆id
 * @param id 会员卡id
 */
export async function fetchMemberConfigDataByVenueIdAndId(
  venueId: string,
  id: string,
): Promise<TypeUtil.RequestResult<MemberCardConfigSetting.SaveSettingItem[]>> {
  return get(`/venue-service/${version}/mem/config/getMemberConfigByValueIdAndId`, { venueId, id });
}

/**
 * 开卡操作
 * @param params
 */
export async function openCard(
  params: InvestCard.BaseOpenCardParams,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/mem/member/open`, params);
}

/**
 *
 * @param params
 */
export async function createStoreOrder(
  params: InvestCard.CreateStoreOrderParams,
): Promise<TypeUtil.RequestResult<InvestCard.OpenCardResult>> {
  return post(`/venue-service/${version}/mem/member/balanceRecharge`, params);
}

/**
 *
 * @param params
 */
export async function createCountOrder(
  params: InvestCard.CreateCountOrderParams,
): Promise<TypeUtil.RequestResult<InvestCard.OpenCardResult>> {
  return post(`/venue-service/${version}/mem/member/buyNum`, params);
}

/**
 *
 * @param params
 */
export async function createExpireOrder(
  params: InvestCard.CreateExpireOrderParams,
): Promise<TypeUtil.RequestResult<InvestCard.OpenCardResult>> {
  return post(`/venue-service/${version}/mem/member/continueDay`, params);
}

/**
 * 支付订单
 * @param params
 */
export async function payInvestCardOrder(
  params: InvestCard.PayOrderParams,
): Promise<TypeUtil.RequestResult<PayResult>> {
  return post(`/venue-service/${version}/mem/member/payOrder`, params);
}

/**
 * 获取当前场馆是否配置人脸设备, 如果返回是, 需要上传
 * @author sssss
 * @date
 */
export async function fetchIsNeedUploadFace(): Promise<TypeUtil.RequestResult> {
  return get(`/venue-service/${version}/hk/face/device/isUse`, {});
}

/**
 * 判断当前实体卡是否已经绑定会员
 * @param cardNo 加密卡号
 * @return '0' 不可用 ‘1’可用
 */
export async function fetchCurrentEntityCardIsUse(
  cardNo: string,
): Promise<TypeUtil.RequestResult<'0' | '1'>> {
  return get(`/venue-service/${version}/read/card/detail/checkIsUse`, { cardNo });
}

/**
 * 获取可用的会员卡卡种和面值
 * @date 2023-09-14
 * @param memberId
 * @param type
 */
export async function fetchMemberConfigDataByMemberId(
  memberId: string,
  type: InvestCardTypeEnum,
): Promise<TypeUtil.RequestResult<MemberCardConfigSetting.SaveSettingItem[]>> {
  return get(`/venue-service/${version}/mem/member/config/list`, { memberId, type });
}
